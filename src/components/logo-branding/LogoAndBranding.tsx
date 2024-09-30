import Image from 'next/image';

const LogoAndBranding: React.FC = () => {
    return (
        <div className="flex items-center">
            <Image src="/images/sdods-tools.jpeg" alt="DevToolBox " width={40} height={40} />
            <span className="ml-2 text-xl font-bold">Dev ToolBox</span>
        </div>
    );
};

export default LogoAndBranding;