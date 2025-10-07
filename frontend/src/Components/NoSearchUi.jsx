import React from "react";
import { ZapIcon } from "lucide-react";

const NoSearchUi = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md ">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4  md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              The note you searched for doesn't exist
            </h3>
            <p className="text-base-content mb-1">
              You're searching for a note that doesn't exist
            </p>
            <p className="text-sm text-base-content/70">
              Create the note and try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSearchUi;
