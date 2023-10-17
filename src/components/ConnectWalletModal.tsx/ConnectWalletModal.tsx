import { useChain } from '@cosmos-kit/react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import C98 from 'images/c98.png';
import Keplr from 'images/keplr.png';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Button } from '@mui/material';
import { CustomModal } from '.';
import { Context } from '@/src/context';
import { WalletModalProps, ChainWalletBase } from '@cosmos-kit/core';

export const ConnectWalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  setOpen,
  walletRepo,
}) => {
  const { address, disconnect } = useChain('aura');
  const [errorMsg, setErrorMsg] = useState('');
  const { updateWalletAddress } = useContext(Context);

  const handleConnect = async (wallet: ChainWalletBase) => {
    const r = await wallet.connect();
    try {
      if (wallet.address) {
        updateWalletAddress(wallet.address);
        setOpen(false);
      } else {
        setErrorMsg('Link wallet failed');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Link wallet failed');
    }
  };

  return (
    <CustomModal open={isOpen as boolean} setOpen={setOpen as any}>
      <div
        className={`flex w-[500px] flex-col p-5 gap-[10px] transition-all duration-300 overflow-hidden justify-start ${
          !address
            ? 'h-[222px] md:w-[380px]'
            : `h-[300px] min-[430px]:h-[320px] md:h-[348px] ${
                errorMsg ? 'h-[312px] min-[430px]:h-[332px] md:h-[360px]' : ''
              }`
        }`}
      >
        <p className="text-2xl leading-7 font-semibold text-center mb-2">
          Link wallet
        </p>
        <div className="relative">
          <div
            className={`top-0 w-full flex flex-col gap-[10px] transition-all duration-300 absolute ${
              !address ? 'opacity-100 z-10 ' : 'opacity-0 -z-10'
            }`}
          >
            {walletRepo?.wallets.map((wallet: ChainWalletBase, index: number) =>
              wallet.walletName.includes('keplr') ? (
                <div
                  key={index}
                  className={`flex items-center justify-between bg-[#F1F2F4] text-subtle-dark p-[10px] rounded-xl ${
                    isMobile || (!isMobile && !window.keplr)
                      ? 'cursor-not-allowed opacity-60 pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                  onClick={() => handleConnect(wallet)}
                >
                  <span className="text-2xl leading-10 font-medium">Keplr</span>
                  <Image src={Keplr} alt="" />
                </div>
              ) : (
                <div
                  key={index}
                  className={`flex items-center justify-between bg-[#F1F2F4] text-subtle-dark p-[10px] rounded-xl ${
                    !isMobile && !window.coin98?.keplr
                      ? 'cursor-not-allowed opacity-60 pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                  onClick={() => handleConnect(wallet)}
                >
                  <span className="text-2xl leading-10 font-medium">C98</span>
                  <Image src={C98} alt="" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
