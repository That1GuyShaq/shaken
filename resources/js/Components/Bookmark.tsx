
import axios from "axios";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import Notification from '@/Components/Notification';
import { Bookmark as LucidBookmark } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

export default function Bookmark({id, subject, bookmarked, isMobile}: {id: number, subject: string, bookmarked: boolean, isMobile: boolean}) {

    const [body, setBody]                 = useState<string>('');
    const [classes, setClasses]           = useState<string>('');
    const [trigger, setTrigger]           = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmarked);
    const [fill, setFill]                 = useState<string>(bookmarked ? "currentColor" : "none");
    const [tip, setTip]                   = useState<string>(bookmarked ? "Un-Bookmark" : "Bookmark");

    const handleBookmark = async () => {
        try {
            await axios.post(route('bookmark.bookmark', [id, isBookmarked, subject])).then((response) => {
              if (response.data.success) {
                  setTrigger(true);
                  setBody(response.data.success);
                  if (isBookmarked) {
                      setFill("none");
                      setTip("Bookmark");
                      setIsBookmarked(false);
                  }else{
                      setFill("currentColor");
                      setTip("Un-Bookmark");
                      setIsBookmarked(true);
                  }
              }else{
                  setTrigger(true);
                  setBody(response.data.error);
                  setClasses("text-yellow-700");
              }
            });

          } catch (error) {

          }
    };

    return (
        <>
            <Notification trigger={trigger} body={body} classes={` ${isMobile && "text-sm w-[90%]"} ${classes}`} />
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <div className="flex justify-center">
                            <Button variant="link" onClick={handleBookmark} className="text-primary">
                                <LucidBookmark fill={fill} className="h-2"/>
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {tip}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
}
