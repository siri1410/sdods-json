import React from 'react';
import Image from 'next/image';

const LogoAndBranding: React.FC = () => {
    return (
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Image src="/images/sdods-tools.jpeg" alt="SDODS Tools" width={48} height={48} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SDODS Tools</h1>
        </div>
    );
};

export default LogoAndBranding;