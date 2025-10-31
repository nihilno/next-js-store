"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaShare } from "react-icons/fa";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/products/${productId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="p-2">
          <FaShare />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={10}
        className="flex w-full items-center justify-center gap-3"
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} className="rounded-md" />
        </TwitterShareButton>
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookIcon size={32} className="rounded-md" />
        </FacebookShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} className="rounded-md" />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon size={32} className="rounded-md" />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
