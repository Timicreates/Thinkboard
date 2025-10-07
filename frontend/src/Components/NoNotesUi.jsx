import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoNotesUi = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="primary/10 rounded-full p-6">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No Notes Yet</h3>

      <p className="text-base-content/70">
        Ready to organize your thoughts ? Create your first note to start your
        journey{" "}
      </p>
      <Link to="/create" className="btn btn-primary">
        Create your first note
      </Link>
    </div>
  );
};

export default NoNotesUi;
