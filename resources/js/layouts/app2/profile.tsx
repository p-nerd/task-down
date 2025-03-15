import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TUser } from "@/types/models";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

const Logout = () => {
    return (
        <DropdownMenuItem onClick={() => {}}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
    );
};

export const Profile = ({ user }: { user: TUser }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={""} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium">{user?.name}</p>
                        <p className="text-muted-foreground text-xs leading-none">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Logout />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
