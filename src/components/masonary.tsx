import { Masonry } from "@mui/lab";
import { Card } from "flowbite-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { DeleteModal } from "./modal";
import { useScreenBreakPoints } from "@/hooks/useScreenBreakPoints";
import { useIsClient } from "@uidotdev/usehooks";

export type item = {
  id: number;
  dateCreated: string;
  description: string;
  code: string;
  title: string;
  language: string;
};

function Masonary({ data }: { data: item[] }) {
  const prev = useRef(data);
  const [exiting, setExiting] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const index = useScreenBreakPoints();
  const isClient = useIsClient();
  useEffect(() => {
    if (JSON.stringify(prev.current) !== JSON.stringify(data)) {
      setExiting(true);
      const time = setTimeout(() => {
        setExiting(false);
        clearTimeout(time);
      }, 1);
      prev.current = data;
    }
  }, [data]);

  return (
    <div className="w-full">
      <AnimatePresence>
        <Masonry
          columns={
            isClient
              ? data.length < 3
                ? data.length < index
                  ? data.length
                  : index
                : index
              : 3
          }
          spacing={2}
          defaultHeight={450}
        >
          {!exiting ? (
            data.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="h-auto max-w-full rounded-lg">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                    {item.title}
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        setId(item.id);
                        setOpenModal(true);
                      }}
                    >
                      <MdDeleteForever color="red" />
                    </IconButton>
                  </h5>
                  <SyntaxHighlighter language={item.language} style={nightOwl}>
                    {item.code}
                  </SyntaxHighlighter>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))
          ) : (
            <></>
          )}
        </Masonry>
      </AnimatePresence>
      <DeleteModal id={id} openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Masonary;
