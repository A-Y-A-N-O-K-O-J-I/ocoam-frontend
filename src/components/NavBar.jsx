const contents = [
  { name: "Home", href: "/" },
  { name: "Health Tips", href: "/health" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];
function NavBar() {
  return (
    <nav className="bg-white shadow h-10 my-7 sticky top-0 z-50 w-full">
      <div className="flex justify-between pt-2 px-3 items-center ">
        <div className="flex space-x-2">
        <img src="/logo.png" className="h-7 w-7 border-3 border-black rounded-full" />
            <h1 className="md:font-extrabold font-bold relative top-1">O.C.O.Y.A.M</h1>
            </div>
            <div className="space-x-10">
        {contents.map((content) => (
          <a href={content.href} key={content.name}>
            {content.name}
          </a>
        ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
