'use client'

import UserCard from "@/components/users/UserCard";
import { fetchAllUsers } from "./api/users/fetchAllUsers";
import {Button} from "@nextui-org/button";
import { useCallback, useEffect, useState } from 'react';
import { UserType } from "@/types/userType";

import {Input} from "@nextui-org/input";
import { MagnifyingGlassIcon, BuildingOffice2Icon, UserPlusIcon } from "@heroicons/react/24/outline";

import {RadioGroup, Radio} from "@nextui-org/radio";

const CURRENT_PAGE = 1;
const RECORDS_PER_PAGE = 25;

export default function Home() {

  const [page, setPage] = useState<number>(CURRENT_PAGE);
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [searchByGender, setSearchByGender] = useState<string>('all');
  const [searchByStatus, setSearchByStatus] = useState<string>('all');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const users = await fetchAllUsers({
      current_page: page,
      page_size: RECORDS_PER_PAGE,
      search_param: searchText,
      search_gender: searchByGender,
      search_status: searchByStatus,
    });

    setUsersList([...usersList,...users]);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText, searchByGender, searchByStatus]);
  
  const searchUsers = useCallback(async () => {
    setPage(CURRENT_PAGE);
    setLoading(true);
    const users = await fetchAllUsers({
      current_page: page,
      page_size: RECORDS_PER_PAGE,
      search_param: searchText,
      search_gender: searchByGender,
      search_status: searchByStatus,
    });

    setUsersList(users);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText, searchByGender, searchByStatus]);

  useEffect(() => {
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    searchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, searchByGender, searchByStatus]);


  return (
    <>
      <div className="w-full py-3">
        <Input
            classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Escriba para buscar..."
            size="sm"
            startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
            type="search"
            onValueChange={text => {
              setUsersList([]);
              setSearchText(text);
            }}
            onClear={() => {
              setSearchText('');
              setPage(CURRENT_PAGE);
              setUsersList([]);
            }}
        />
      </div>
      <div className="flex flex-row items-center my-4 gap-x-7">
        <RadioGroup
            value={searchByStatus}
            label="Filtrar por Status"
            orientation="horizontal"
            onValueChange={setSearchByStatus}
            >
            <Radio value="all">Todos</Radio>
            <Radio value="active">Activos</Radio>
            <Radio value="inactive">Inactivos</Radio>
        </RadioGroup>
        <RadioGroup
            value={searchByGender}
            label="Filtrar por Género"
            orientation="horizontal"
            onValueChange={setSearchByGender}
            >
            <Radio value="all">Todos</Radio>
            <Radio value="male">Masculino</Radio>
            <Radio value="female">Femenino</Radio>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 py-3">
        {usersList.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <Button 
        className="w-full" 
        variant="bordered" 
        color="primary" 
        isLoading={loading}
        onClick={() => setPage(page + 1)}
        >Cargar mas</Button>
    </>
  );
}
