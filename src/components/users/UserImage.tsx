import { UserType } from "@/types/userType"
import Image from "next/image";
import FemaleImage from "@/components/icons/female.png";
import MaleImage from "@/components/icons/male.png";
import { CSSProperties } from "react";

type UserImageParams = {
    gender: UserType['gender'];
    name?: UserType['name'];
    style?: CSSProperties;
    width?: number;
    height?: number;
    className? : string;
}

export default function UserImage({ gender, name, style, width = 70, height = 70, className } : UserImageParams) {
    return (
        <Image
            className={className} 
            src={gender === 'female' 
                ? FemaleImage 
                : MaleImage} 
            alt={name || "image"} 
            width={width} 
            height={height}
            style={{
                width: width,
                height: height,
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: '50%',
                backgroundColor: '#bebcb7',
                ...style
            }}
        />
    )
}