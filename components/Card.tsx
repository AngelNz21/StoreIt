import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import ActionDropdown from "@/components/ActionDropdown";
import { toZonedTime } from "date-fns-tz";
import { format as formatDate } from "date-fns";

const Card = ({ file }: { file: Models.Document }) => {
  const mexicoCityTime = toZonedTime(file.$createdAt, "America/Mexico_City");
  const formattedMexicoCityTime = formatDate(mexicoCityTime, "h:mmaaa, dd MMM");

  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <p className="body-2 text-light-100">{formattedMexicoCityTime}</p>
        <p className="caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};
export default Card;
