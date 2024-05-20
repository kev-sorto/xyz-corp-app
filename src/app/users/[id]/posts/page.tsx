'use client'
import { fetchUserDetails } from "@/app/api/users/fetchUserDetails";
import { fetchAllUserPosts } from "@/app/api/users/posts/fetchAllUserPosts";
import UserImage from "@/components/users/UserImage";
import UserPost from "@/components/users/UserPost";
import { Button } from "@nextui-org/button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { notFound } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserType } from "@/types/userType";
import { UserPostType } from "@/types/userPostType";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";

import {Input, Textarea} from "@nextui-org/input";
import { createNewPost } from "@/app/api/users/posts/createNewPost";

export default function UserPosts({ params }: { params: { id: number } }) {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserType | null>();
    const [posts, setPosts] = useState<UserPostType[]>([]);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const isInvalidTitle = useMemo(() => {
        return title.trim() === "" || title.trim().length > 40;
    }, [title]);

    const invalidTitleMessages = useCallback(() => {
        if(title.trim() === "") {
            return "El titulo es requerido";
        }
        if(title.trim().length > 40) {
            return "El titulo no puede tener mas de 40 caracteres";
        }
    }, [title]);

    const invalidContentMessages = useCallback(() => {
        if(content.trim() === "") {
            return "El contenido es requerido";
        }
        if(content.trim().length > 200) {
            return "El contenido no puede tener mas de 200 caracteres";
        }
    }, [content]);

    const isInvalidContent = useMemo(() => {
        return content.trim() === "" || content.trim().length > 200;
    }, [content]);

    const loadData = useCallback(async () => {
        setLoading(true);
        const userData = await fetchUserDetails({ userId: params.id});
        if(!userData) {
            notFound();
        }
        setUser(userData);
        const postsData  = await fetchAllUserPosts({ userId: params.id});
        setPosts(postsData);
        setLoading(false)
    }, [params.id]);

    useEffect(() =>{
        loadData();;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if(loading) {
        return <div className="text-center text-xl text-slate-700 my-4">Cargando...</div>
    }

    if(!user) {
        notFound();
    }

    const savePost = async () => {
        const newPost = {
            user_id: params.id,
            title,
            content
        }
        await createNewPost(newPost);
        setTitle("");
        setContent("");
        onClose();
        await loadData();
    }

    return (
    <>
        <div className="my-2">
            <div className="flex flex-row px-3 py-5 rounded-xl border">
                <div className="mx-3">
                    <UserImage 
                        className={user.status === "active" ? "grayscale-0" : "grayscale"}
                        width={120} 
                        height={120} 
                        gender={user.gender} 
                        name={user.name}/>
                </div>
                <div className="flex flex-col ml-3">
                    <p>Nombre: <span className="font-semibold">{user.name}</span></p>
                    <p>Email: <span className="font-semibold">{user.email}</span> </p>
                    <p>Género: <span className="font-semibold">{user.gender === 'male' ? 'Masculino' : 'Femenino'}</span></p>
                    <p>Status: <span className="font-semibold">{user.status === 'active' ? 'Activo' : 'Inactivo'}</span></p>
                    <Button onPress={onOpen} color="default" variant="bordered" className="my-3" endContent={<PencilIcon className="w-4 h-4"/>}>
                        Nuevo Post
                    </Button>
                </div>  
            </div>

            <div className="flex flex-col py-3 gap-4">
                {posts.map(post => (<UserPost key={post.id} post={post} user={user} />))}

                { posts.length <= 0 && <p className="text-center text-xl text-slate-700 my-4">Aún no hay posts publicados.</p>}
            </div>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Nuevo usuario</ModalHeader>
                <ModalBody>
                    <Input
                        value={title}
                        autoFocus={true}
                        type="text" 
                        label="Título" 
                        placeholder="Ingrese un título" 
                        onValueChange={setTitle}
                        isInvalid={isInvalidTitle}
                        color={isInvalidTitle ? "danger" : "default"}
                        errorMessage={invalidTitleMessages()}
                        />
                    <Textarea 
                        value={content}
                        label="Contenido" 
                        placeholder="Ingrese el contenido"  
                        isInvalid={isInvalidContent}
                        color={isInvalidContent ? "danger" : "default"}
                        errorMessage={invalidContentMessages()}
                        onValueChange={setContent}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onPress={savePost} isDisabled={isInvalidContent || isInvalidTitle}>
                        Publicar
                    </Button>
                </ModalFooter>
            </>
        )}
            </ModalContent>
        </Modal>
    </>)
    
}