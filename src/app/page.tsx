import { Room } from "@/app/Room";
import { CodeRunner } from "@/components/CodeRunner";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";

export default function Home() {
  return (
    // <main>
    //   <Room>
    //     <CollaborativeEditor />
    //   </Room>
    // </main>
    <div>
      <h1>Run JavaScript Code</h1>
      <CodeRunner />
    </div>
  );
}
