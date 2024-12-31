"use client";

import Link from 'next/link';
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown, Loader } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Fragment } from 'react';
import { Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button"

const Header = () => {
    const { setTheme } = useTheme();
    const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

    return (
        <div className='shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]'>
            <div className='w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center flex-1  gap-9'>
                    <Link href='/dashboard' className='font-bold text-primary text-[20px]'>
                        ResumeBuild.ai
                    </Link>
                    {user && !isLoading && (
                        <div className='flex items-center gap-2'>
                            <span className='font-normal text-black/50 dark:text-white'>Hi,</span>
                            <h5 className='font-bold text-black dark:text-white'>
                                {user.given_name}
                            </h5>
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <Fragment>
                    <div className='flex items-center gap-4'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {isLoading ? (
                            <Loader className='animate-spin !size-6 text-black dark:text-primary-foreground' />
                        ) : error ? (
                            <span className='text-red-500'>Error loading user data</span>
                        ) : (
                            isAuthenticated && user && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus-visible:outline-none" role='button' aria-label='User menu'>
                                        <div className='flex items-center gap-1'>
                                            <Avatar className='!cursor-pointer'>
                                                <AvatarImage src={user.picture || ''} />
                                                <AvatarFallback>
                                                    {user?.given_name?.[0] || 'U'}
                                                    {user?.family_name?.[0] || 'N'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <ChevronDown size='17px' />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='my-3'>
                                        <DropdownMenuItem asChild className='!text-red-500 font-medium'>
                                            <LogoutLink>Log out</LogoutLink>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        )}
                    </div>
                </Fragment>
            </div>
        </div>
    );
};

export default Header;
