import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRecordVinyl, FaStop, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function VideoCall() {
  const { accessCode } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get('role'); // 'moderator' or 'student'
  
  // Socket and WebRTC refs
  const socketRef = useRef(null);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  
  // State management - FIXED: Create unique user ID per tab/session
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [localUserId] = useState(`${role}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`); // More unique ID
  const [userName, setUserName] = useState(role === 'moderator' ? 'Moderator' : 'Student');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [notification, setNotification] = useState(null);
  const [countdown, setCountdown] = useState(null);
  
  // Media controls state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [voiceActivity, setVoiceActivity] = useState({});

  // Notification component
  const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

    return (
      <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ×
        </button>
      </div>
    );
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Name editing functions
  const handleNameEdit = () => {
    setIsEditingName(true);
    setTempName(userName);
  };

  const handleNameSave = () => {
    if (tempName.trim() && tempName.trim() !== userName) {
      const newName = tempName.trim();
      setUserName(newName);
      setIsEditingName(false);
      
      // Notify other participants of name change
      if (socketRef.current) {
        socketRef.current.emit('name-changed', {
          roomId: accessCode,
          newName: newName
        });
      }
      
      showNotification('Name updated successfully!', 'success');
    } else {
      setIsEditingName(false);
    }
  };

  const handleNameCancel = () => {
    setTempName(userName);
    setIsEditingName(false);
  };

  // Voice activity detection
  const setupVoiceDetection = (stream) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const checkVoiceActivity = () => {
        if (!analyserRef.current) return;
        
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        
        const isActive = average > 20; // Adjust threshold as needed
        
        if (socketRef.current) {
          socketRef.current.emit('voice-activity', {
            roomId: accessCode,
            isActive
          });
        }
        
        setVoiceActivity(prev => ({
          ...prev,
          [localUserId]: isActive
        }));
        
        setTimeout(checkVoiceActivity, 100);
      };
      
      checkVoiceActivity();
    } catch (error) {
      console.error('Voice detection not supported:', error);
    }
  };

  // Initialize media stream
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Setup voice detection
      setupVoiceDetection(stream);
      
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      showNotification('Failed to access camera/microphone. Please check permissions.', 'error');
      return null;
    }
  };

  // FIXED: Better peer connection management
  const createPeerConnection = (remoteSocketId) => {
    console.log(`🔗 Creating peer connection for ${remoteSocketId}`);
    
    // Close existing connection if it exists
    if (peersRef.current[remoteSocketId]) {
      console.log(`Closing existing peer connection for ${remoteSocketId}`);
      peersRef.current[remoteSocketId].close();
      delete peersRef.current[remoteSocketId];
    }

    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });

    // Add connection state monitoring
    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state for ${remoteSocketId}:`, peerConnection.connectionState);
      if (peerConnection.connectionState === 'failed') {
        console.log(`Connection failed for ${remoteSocketId}, cleaning up`);
        if (peersRef.current[remoteSocketId]) {
          delete peersRef.current[remoteSocketId];
        }
      }
    };

    // Add local stream to peer connection
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStreamRef.current);
      });
    }

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      console.log('🎥 Received remote stream from:', remoteSocketId);
      const remoteStream = event.streams[0];
      
      setParticipants(prev => prev.map(participant => 
        participant.socketId === remoteSocketId 
          ? { ...participant, stream: remoteStream }
          : participant
      ));
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          to: remoteSocketId,
          from: socketRef.current.id
        });
      }
    };

    peersRef.current[remoteSocketId] = peerConnection;
    return peerConnection;
  };

  // FIXED: Initialize socket connection with better identity management
  const initializeSocket = () => {
    const socket = io('https://a-y-a-n-o-k-o-j-i-ocoyam.hf.space');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Connected to signaling server with ID:', socket.id);
      console.log('👤 My details:', { userId: localUserId, role, name: userName });
      setIsConnected(true);
      
      // Join the room with role
      socket.emit('join-room', {
        userId: localUserId,
        roomId: accessCode,
        name: userName,
        role: role
      });
    });

    // FIXED: Handle user list - only exclude by socket ID
    socket.on('user-list', async (users) => {
      console.log('📝 Received user list:', users);
      console.log('🔍 My socket ID:', socket.id);
      
      // Only exclude by socket ID (not by role or name, since multiple tabs can have same role/name)
      const otherUsers = users.filter(user => {
        const isMe = user.socketId === socket.id;
        console.log(`👤 User: ${user.name} (${user.socketId}) - ${isMe ? '❌ EXCLUDE (MY SOCKET)' : '✅ INCLUDE'}`);
        return !isMe;
      });
      
      console.log('✅ Other users to connect to:', otherUsers);
      
      // Clear existing participants and peer connections
      Object.keys(peersRef.current).forEach(socketId => {
        if (peersRef.current[socketId]) {
          peersRef.current[socketId].close();
          delete peersRef.current[socketId];
        }
      });
      
      setParticipants(otherUsers.map(user => ({
        ...user,
        stream: null
      })));

      // Create peer connections for existing users
      setTimeout(async () => {
        for (const user of otherUsers) {
          console.log(`🤝 Initiating connection to ${user.name} (${user.socketId})`);
          const peerConnection = createPeerConnection(user.socketId);
          
          try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            
            socket.emit('offer', {
              offer,
              to: user.socketId,
              from: socket.id
            });
            
            console.log(`📤 Sent offer to ${user.name}`);
          } catch (error) {
            console.error(`❌ Error creating offer for ${user.name}:`, error);
          }
        }
      }, 500);
    });

    // FIXED: Handle new user joining - only exclude by socket ID
    socket.on('user-joined', ({ userId, socketId, name, role: userRole }) => {
      console.log(`📢 New user joined: ${name} (${userRole}) with socket ${socketId}`);
      console.log('🔍 My socket ID:', socket.id);
      
      // Only exclude if it's the same socket ID
      const isMe = socketId === socket.id;
      
      if (!isMe) {
        console.log('✅ Adding new participant:', { userId, socketId, name, role: userRole });
        
        setParticipants(prev => {
          // Check if this socket ID already exists
          const alreadyExists = prev.some(p => p.socketId === socketId);
          
          if (alreadyExists) {
            console.log('⚠️ User already exists, skipping');
            return prev;
          }
          
          const newParticipant = {
            userId,
            socketId,
            name,
            role: userRole,
            stream: null
          };
          
          return [...prev, newParticipant];
        });
        
        // Wait for them to send us an offer (they're the initiator since they joined)
        console.log(`⏳ Waiting for offer from ${name}`);
        
      } else {
        console.log('❌ This is my own socket, ignoring');
      }
    });

    // Handle user disconnecting
    socket.on('user-disconnected', (socketId) => {
      console.log('👋 User disconnected:', socketId);
      
      // Close peer connection
      if (peersRef.current[socketId]) {
        peersRef.current[socketId].close();
        delete peersRef.current[socketId];
      }
      
      // Remove from participants
      setParticipants(prev => {
        const userToRemove = prev.find(p => p.socketId === socketId);
        if (userToRemove) {
          console.log(`🗑️ Removing participant: ${userToRemove.name}`);
        }
        return prev.filter(p => p.socketId !== socketId);
      });
      
      // Clean up voice activity
      setVoiceActivity(prev => {
        const newActivity = { ...prev };
        delete newActivity[socketId];
        return newActivity;
      });
    });

    // Handle name changes from other users
    socket.on('user-name-changed', ({ socketId, newName }) => {
      setParticipants(prev => prev.map(participant => 
        participant.socketId === socketId 
          ? { ...participant, name: newName }
          : participant
      ));
    });

    // Handle moderator left
    socket.on('moderator-left', ({ message, countdown: initialCountdown }) => {
      showNotification(message, 'warning');
      setCountdown(initialCountdown);
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    });

    // Handle moderator returned
    socket.on('moderator-returned', ({ message }) => {
      showNotification(message, 'success');
      setCountdown(null);
    });

    // Handle room closed
    socket.on('room-closed', ({ reason }) => {
      showNotification(`Room closed: ${reason}`, 'error');
      setTimeout(() => {
        navigate('/classes');
      }, 3000);
    });

    // Handle class ended
    socket.on('class-ended', ({ reason }) => {
      showNotification(`Class ended: ${reason}`, 'info');
      setTimeout(() => {
        navigate('/classes');
      }, 3000);
    });

    // Voice activity from other users
    socket.on('user-voice-activity', ({ socketId, isActive }) => {
      setVoiceActivity(prev => ({
        ...prev,
        [socketId]: isActive
      }));
    });

    // FIXED: WebRTC signaling events with better error handling
    socket.on('offer', async ({ offer, from }) => {
      console.log('📨 Received offer from:', from);
      
      try {
        const peerConnection = createPeerConnection(from);
        
        await peerConnection.setRemoteDescription(offer);
        
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        
        socket.emit('answer', {
          answer,
          to: from,
          from: socket.id
        });
        
        console.log(`✅ Successfully handled offer and sent answer to ${from}`);
      } catch (error) {
        console.error('❌ Error handling offer:', error);
      }
    });

    socket.on('answer', async ({ answer, from }) => {
      console.log('📨 Received answer from:', from);
      
      const peerConnection = peersRef.current[from];
      if (peerConnection && peerConnection.signalingState === 'have-local-offer') {
        try {
          await peerConnection.setRemoteDescription(answer);
          console.log(`✅ Successfully set remote description for ${from}`);
        } catch (error) {
          console.error('❌ Error handling answer:', error);
        }
      } else {
        console.warn(`⚠️ Cannot handle answer from ${from}. State: ${peerConnection?.signalingState || 'No peer connection'}`);
      }
    });

    socket.on('ice-candidate', async ({ candidate, from }) => {
      console.log('📨 Received ICE candidate from:', from);
      
      const peerConnection = peersRef.current[from];
      if (peerConnection && peerConnection.remoteDescription) {
        try {
          await peerConnection.addIceCandidate(candidate);
          console.log(`✅ Added ICE candidate for ${from}`);
        } catch (error) {
          console.error('❌ Error adding ICE candidate:', error);
        }
      } else {
        console.warn(`⚠️ Cannot add ICE candidate for ${from} - no remote description`);
      }
    });

    return socket;
  };

  // Media control functions
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const leaveCall = async () => {
    console.log('🚪 Leave call initiated...');
    
    // If moderator, end the class
    if (role === 'moderator') {
      try {
        console.log('👨‍🏫 Moderator ending class...');
        await fetch(`https://a-y-a-n-o-k-o-j-i-ocoyam.hf.space/classes/end-class/${accessCode}`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Error ending class:', error);
      }
    }
    
    // Clean up BEFORE navigating
    cleanup();
    
    // Small delay to ensure cleanup completes
    setTimeout(() => {
      console.log('🏠 Navigating to classes...');
      navigate('/classes');
    }, 100);
  };

  // Cleanup function
  const cleanup = () => {
    console.log('🧹 Starting cleanup...');
    
    // Stop voice detection first
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      console.log('🔇 Closing audio context...');
      audioContextRef.current.close().catch(err => console.log('Audio context close error:', err));
      audioContextRef.current = null;
    }
    
    // Stop all media tracks
    if (localStreamRef.current) {
      console.log('📹 Stopping all media tracks...');
      localStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      localStreamRef.current = null;
    }
    
    // Clear video element source
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
      localVideoRef.current.load();
    }
    
    // Close all peer connections
    Object.keys(peersRef.current).forEach(socketId => {
      if (peersRef.current[socketId]) {
        peersRef.current[socketId].close();
      }
    });
    peersRef.current = {};
    
    // Stop media recorder if recording
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    
    // Disconnect socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    
    console.log('✅ Cleanup completed');
  };

  const startRecording = () => {
    if (localStreamRef.current && !isRecording) {
      const mediaRecorder = new MediaRecorder(localStreamRef.current, {
        mimeType: 'audio/webm'
      });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      showNotification('Recording started', 'success');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      setTimeout(() => {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `class-recording-${accessCode}-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setRecordedChunks([]);
        showNotification('Recording saved', 'success');
      }, 100);
    }
  };

  // Initialize everything on component mount
  useEffect(() => {
    const initialize = async () => {
      const stream = await initializeMedia();
      if (stream) {
        initializeSocket();
      }
    };
    
    initialize();
    
    // Cleanup on unmount and page unload
    const handleBeforeUnload = () => {
      cleanup();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Class: {accessCode}</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-300">
              {role === 'moderator' ? 'You are the moderator' : 'You are a student'}
            </p>
            <p className="text-xs text-gray-500">ID: {localUserId.slice(-8)}</p>
            {/* Name editing */}
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-gray-700 text-white px-2 py-1 rounded text-sm w-24"
                    maxLength={20}
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                  />
                  <button onClick={handleNameSave} className="text-green-400 hover:text-green-300">
                    <FaCheck size={12} />
                  </button>
                  <button onClick={handleNameCancel} className="text-red-400 hover:text-red-300">
                    <FaTimes size={12} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleNameEdit}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  title="Click to change your name"
                >
                  <FaEdit size={12} />
                  <span className="text-xs">Change Name</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {countdown && (
            <div className="bg-red-500 px-3 py-1 rounded text-sm animate-pulse">
              Room closing in: {countdown}s
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm">{isConnected ? 'Connected' : 'Connecting...'}</span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Local Video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-sm transition-all ${
              voiceActivity[localUserId] ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-black bg-opacity-50'
            }`}>
              You ({userName})
            </div>
            {isVideoOff && (
              <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                <FaVideoSlash size={48} className="text-gray-400" />
              </div>
            )}
            {isMuted && (
              <div className="absolute top-2 right-2 bg-red-500 p-2 rounded">
                <FaMicrophoneSlash size={16} />
              </div>
            )}
          </div>

          {/* Remote Videos */}
          {participants.map((participant) => (
            <RemoteVideo
              key={participant.socketId}
              participant={participant}
              isActive={voiceActivity[participant.socketId]}
            />
          ))}
        </div>

        {/* Status Messages */}
        {participants.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">
              {role === 'moderator' 
                ? 'Waiting for students to join...' 
                : 'Connecting to class...'}
            </p>
          </div>
        )}

        {/* Debug Info */}
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            👥 {participants.length} participant{participants.length !== 1 ? 's' : ''} connected
          </p>
          <p className="text-xs text-gray-600 mt-1">
            My ID: {localUserId} | Socket: {socketRef.current?.id || 'Not connected'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4 flex justify-center items-center gap-4">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'}`}
        >
          {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'}`}
        >
          {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
        </button>

        {role === 'moderator' && (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`}
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            {isRecording ? <FaStop /> : <FaRecordVinyl />}
          </button>
        )}

        <button
          onClick={leaveCall}
          className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          title={role === 'moderator' ? 'End Class' : 'Leave Class'}
        >
          <FaPhone className="transform rotate-45" />
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

// Remote Video Component
function RemoteVideo({ participant, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (participant.stream && videoRef.current) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
      {participant.stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold">{participant.name?.charAt(0) || '?'}</span>
            </div>
            <p className="text-sm text-gray-300">Connecting...</p>
          </div>
        </div>
      )}
      <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-sm transition-all ${
        isActive ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-black bg-opacity-50'
      }`}>
        {participant.name} {participant.role === 'moderator' && '👨‍🏫'}
      </div>
    </div>
  );
}