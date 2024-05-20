import { Suspense } from "react";
import Loading from "./loading";

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <Suspense fallback={<Loading />}>
        {children}
    </Suspense>
  )
}