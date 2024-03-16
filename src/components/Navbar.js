function Navbar() {
  return (
    <header className="border-b border-gray-300 p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-black">News Feed</h1>
        <nav className="flex items-center w-auto">
          <ul className="text-base text-gray-700 flex justify-between">
            <li>
              <a
                className="px-5 py-2 font-semibold hover:text-blue-700"
                href="#"
              >
                Home
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
