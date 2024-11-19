import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface NotificationProps {
  body?: string;
  trigger: boolean;
  classes?: string;
};

const Notification: React.FC<NotificationProps> = ({ body, trigger, classes }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (trigger) {
      toast({
        description: body,
        className: "w-30 top-0 right-1/2 transform translate-x-1/2 fixed px-auto py-3 mt-4 z-50 " + classes,
        duration: 5000
      });
    }
  }, [body, trigger, classes]);

  return trigger ? <></> : null;
};

export default Notification;
