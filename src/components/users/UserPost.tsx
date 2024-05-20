import { UserPostType } from "@/types/userPostType"
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { UserType } from "@/types/userType";

type UserPostProps = {
    post: UserPostType,
    user: UserType
}
export default function	UserPost ({ post, user } : UserPostProps) {
    return (
        <Card className="px-3 py-5 rounded-xl border" shadow="none" style={{backgroundColor: '#ffffff'}}>
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-2xl text-title font-semibold">{post.title}</p>
                    <p className="text-sm text-default-500">By <span className="font-semibold">{user.name}</span></p>
                </div>
            </CardHeader>
            <CardBody>
                <p className="py-2">{post.body}</p>
            </CardBody>
        </Card>
    )
}