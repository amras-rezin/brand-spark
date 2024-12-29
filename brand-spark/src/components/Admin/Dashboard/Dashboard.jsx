'use client';
import { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../../ui/sidebar';
import {
  IconFilters,
  IconLogout2,
  IconTool,
  IconVideo,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../../src/redux/slices/adminSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const links = [
    {
      label: 'Add Service',
      href: '/admin/add-service',
      icon: (
        <IconTool className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Add Video',
      href: '/admin/videos',
      icon: (
        <IconVideo className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Add Portfolio',
      href: '/admin/add-portfolio',
      icon: (
        <IconFilters className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Logout',
      onClick: () => {
        console.log('Logout clicked'); // Debugging log
        dispatch(adminLogout()); // Dispatch your logout action
      },
      icon: (
        <IconLogout2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        ' flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      to={''}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="/logo.png"
        alt=""
        className="h-8 w-8 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Brand Spark
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to={''}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="/logo.png"
        alt=""
        className="h-8 w-8 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center gap-2 w-full h-full">
        <img
          src="/logo.png"
          alt="image"
          className="w-full h-full sm:w-3/4 md:w-full lg:w-1/2 xl:w-2/3 object-contain sm:object-contain md:object-contain"
        />
      </div>
    </div>
  );
};
