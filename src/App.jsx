import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { FinderWindow, ImageWindow, Resume, SafariWindow, TerminalWindow, TextWindow } from "@windows";
import { Dock, Navbar, Welcome } from "@components";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <TerminalWindow />
      <SafariWindow />
      <Resume />
      <FinderWindow />
      <TextWindow />
      <ImageWindow />
    </main>
  );
};

export default App;
