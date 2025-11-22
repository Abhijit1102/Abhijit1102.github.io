import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { TerminalWindow } from "@windows";
import { Dock, Navbar, Welcome } from "@components";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <TerminalWindow />
    </main>
  );
};

export default App;
