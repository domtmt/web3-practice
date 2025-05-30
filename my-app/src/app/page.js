///////////////////////////////////////////////////////////////////////////// Tailwind CSS 적용
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function MyEthValue() {
  // 상태 변수 정의
  const [account, setAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);

  // 지갑 연결 및 잔액 조회 함수
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask가 필요합니다.");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);
      setEthBalance(balanceEth);
    } catch (err) {
      console.error(err);
    }
  };

  // ETH 시세 조회 함수
  const fetchEthPrice = async () => {
    try {
      const res = await fetch(
        "https://api.upbit.com/v1/ticker?markets=KRW-ETH"
      );
      const data = await res.json();
      const price = data[0].trade_price;
      setEthPrice(price);
    } catch (err) {
      console.error(err);
    }
  };

  // 컴포넌트 마운트 시 가격 가져오기
  useEffect(() => {
    fetchEthPrice();

    const intervalId = setInterval(() => {
      fetchEthPrice();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          내 이더리움 자산
        </h2>

        {account ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">지갑 주소</p>
              <p className="text-gray-700 font-mono text-sm truncate">
                {account}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-500 mb-1">ETH 잔액</p>
                <p className="text-xl font-semibold text-blue-700">
                  {ethBalance ? parseFloat(ethBalance).toFixed(4) : "0"} ETH
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-500 mb-1">ETH 시세</p>
                <p className="text-xl font-semibold text-green-700">
                  {ethPrice ? ethPrice.toLocaleString() : "..."} 원
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-500 mb-1">총 자산 가치</p>
              <p className="text-2xl font-bold text-purple-700">
                {ethPrice && ethBalance
                  ? (parseFloat(ethBalance) * ethPrice).toLocaleString()
                  : "0"}{" "}
                원
              </p>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              * 가격 데이터는 Upbit API에서 실시간으로 업데이트됩니다
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-gray-600">
              MetaMask 지갑에 연결하여 ETH 자산 가치를 확인하세요
            </p>
            <button
              onClick={connectWallet}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              지갑 연결하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


///////////////////////////////////////////////////////////////////////////// 가격 가져오기 및 UI 업데이트
// "use client";

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// export default function MyEthValue() {
//   // 1. 상태 변수 정의 (계정 주소, ETH 잔액, ETH 시세)
//   const [account, setAccount] = useState(null);
//   const [ethBalance, setEthBalance] = useState(null);
//   const [ethPrice, setEthPrice] = useState(null);

//   // 2. 지갑 연결 및 잔액 조회 함수
//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask가 필요합니다.");
//       return;
//     }
//     try {
//       // MetaMask 지갑 연결 (사용자에게 계정 접근 요청)
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//       // ETH 잔액 조회 (wei 단위 → ether 단위 변환)
//       const balanceWei = await provider.getBalance(address);
//       const balanceEth = ethers.formatEther(balanceWei);
//       setEthBalance(balanceEth);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 3. ETH 시세 조회 함수 (Upbit API 호출)
//   const fetchEthPrice = async () => {
//     try {
//       const res = await fetch("https://api.upbit.com/v1/ticker?markets=KRW-ETH");
//       const data = await res.json();
//       // 응답 데이터 배열의 첫 번째 항목에서 가격 추출
//       const price = data[0].trade_price;
//       setEthPrice(price);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 컴포넌트 마운트 시 1초마다 가격을 가져오기
//   useEffect(() => {
//     // 초기 가격 가져오기
//     fetchEthPrice();

//     // 1초마다 가격 업데이트
//     const intervalId = setInterval(() => {
//       fetchEthPrice();
//     }, 1000);

//     // 컴포넌트 언마운트 시 인터벌 정리
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div>
//       {account ? (
//         /* 지갑 연결 후: 잔액 및 평가액 표시 */
//         <div>
//           <p>지갑 주소: {account}</p>
//           <p>ETH 잔액: {ethBalance} ETH</p>
//           <p>현재 ETH 가격: {ethPrice ? ethPrice.toLocaleString() : "..."} 원</p>
//           <p>
//             총 자산 가치:{" "}
//             {ethPrice && ethBalance
//               ? (parseFloat(ethBalance) * ethPrice).toLocaleString()
//               : "..."}{" "}
//             원
//           </p>
//         </div>
//       ) : (
//         /* 지갑 미연결: 연결 버튼 표시 */
//         <button onClick={connectWallet}>지갑 연결</button>
//       )}
//     </div>
//   );
// }



///////////////////////////////////////////////////////////////////////////// 코드 구현: 이더 전송 기능 (1) - 함수
// "use client";

// import { useState } from "react";
// import { ethers } from "ethers";

// export default function Home() {
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [toAddress, setToAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [txHash, setTxHash] = useState(null); // 전송 결과 해시 저장용

//   async function connectWallet() {
//     if (!window.ethereum) {
//       alert("MetaMask를 설치해주세요.");
//       return;
//     }
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);
//       console.log("지갑 연결 성공:", accounts[0]);
//     } catch (error) {
//       if (error.code === 4001) {
//         console.log("사용자가 지갑 연결을 취소했습니다.");
//       } else {
//         console.error(error);
//       }
//     }
//   }

//   async function sendEther() {
//     if (!window.ethereum) return alert("MetaMask가 필요합니다!");
//     if (!currentAccount) return alert("먼저 지갑을 연결하세요.");
//     try {
//       if (!ethers.isAddress(toAddress))
//         return alert("올바른 지갑 주소를 입력하세요.");
//       if (amount === "" || isNaN(Number(amount)))
//         return alert("올바른 이더 금액을 입력하세요.");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const tx = await signer.sendTransaction({
//         to: toAddress,
//         value: ethers.parseEther(amount),
//       });
//       console.log("트랜잭션 전송 완료:", tx.hash);
//       setTxHash(tx.hash); // 상태 업데이트
//       alert(`트랜잭션 전송 성공!
// Tx 해시: ${tx.hash}`);
//       // 입력 필드 초기화
//       setToAddress("");
//       setAmount("");
//     } catch (error) {
//       setTxHash(null); // 실패 시 해시 초기화
//       if (error.code === 4001) {
//         console.log("사용자가 전송을 취소했습니다.");
//         alert("전송이 취소되었습니다.");
//       } else {
//         console.error(error);
//         alert("전송 실패: " + (error.data?.message || error.message || error));
//       }
//     }
//   }

//   return (
//     <div className="p-4 min-h-screen bg-slate-50">
//       <h1 className="text-2xl font-bold mb-4 text-slate-800">DApp 예제</h1>
//       {!currentAccount ? (
//         <button
//           onClick={connectWallet}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           지갑 연결
//         </button>
//       ) : (
//         <div className="mt-6 p-4 border rounded shadow-md bg-white">
//           <h3 className="text-lg font-semibold mb-3 text-slate-800">이더 전송하기</h3>
//           <input
//             type="text"
//             placeholder="받는 지갑 주소 (0x...)"
//             value={toAddress}
//             onChange={(e) => setToAddress(e.target.value)}
//             className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-indigo-400 outline-none text-slate-800"
//           />
//           <input
//             type="text"
//             placeholder="전송 ETH 양 (예: 0.1)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-indigo-400 outline-none text-slate-800"
//           />
//           <button
//             onClick={sendEther}
//             className="w-full px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
//             disabled={!toAddress || !amount}
//           >
//             전송
//           </button>
//           {txHash && (
//             <div className="mt-3 p-2 bg-blue-50 border border-blue-400 rounded text-sm">
//               <p className="text-slate-700">마지막 전송 해시:</p>
//               <a
//                 href={`https://sepolia.etherscan.io/tx/${txHash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-700 hover:underline break-all"
//               >
//                 {txHash}
//               </a>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////// 코드 구현: 이더 전송 기능 (1) - 함수
// "use client";
// import React, { useState } from "react";
// import { ethers } from "ethers";

// export default function Home() {
//   const [toAddress, setToAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [currentAccount, setCurrentAccount] = useState(null);

//   async function connectWallet() {
//     if (!window.ethereum) {
//       alert("MetaMask를 설치해주세요."); // MetaMask 미설치 대응
//       return;
//     }
//     try {
//       // 연결 요청 → 사용자가 MetaMask에서 승인하면 계정 배열 반환
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]); // 첫 번째 계정 설정
//       console.log("지갑 연결 성공:", accounts[0]);
//     } catch (error) {
//       // 오류 처리: 연결 요청 거부 등
//       if (error.code === 4001) {
//         // 4001: 사용자가 연결 요청을 거부
//         console.log("사용자가 지갑 연결을 취소했습니다.");
//       } else {
//         console.error(error);
//       }
//     }
//   }

//   async function sendEther() {
//     if (!window.ethereum) {
//       alert("MetaMask가 필요합니다!");
//       return;
//     }
//     if (!currentAccount) {
//       alert("먼저 지갑을 연결하세요.");
//       return;
//     }
//     try {
//       // 입력값 검증 (간단히 처리)
//       if (!ethers.isAddress(toAddress)) {
//         alert("올바른 지갑 주소를 입력하세요.");
//         return;
//       }
//       if (amount === "" || isNaN(Number(amount))) {
//         alert("올바른 이더 금액을 입력하세요.");
//         return;
//       }
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       // 이더 값을 Wei 단위로 변환하여 트랜잭션 전송
//       const tx = await signer.sendTransaction({
//         to: toAddress,
//         value: ethers.parseEther(amount), // 입력한 ETH 문자열 -> Wei 변환
//       });
//       console.log("트랜잭션 전송 완료:", tx.hash);
//       alert(`트랜잭션 전송 성공!\nTx 해시: ${tx.hash}`);
//     } catch (error) {
//       if (error.code === 4001) {
//         console.log("사용자가 전송을 취소했습니다.");
//       } else {
//         console.error(error);
//         alert("전송 실패: " + (error.message || error));
//       }
//     }
//   }


//   return (
//     <div>
//       <button onClick={connectWallet}>지갑 연결</button>
//       {currentAccount && (<><p>지갑 연결됨: {currentAccount}</p>
//         <div style={{ marginTop: "1em" }}>
//           <h3>이더 전송하기</h3>
//           <input
//             type="text"
//             placeholder="받는 지갑 주소"
//             value={toAddress}
//             onChange={(e) => setToAddress(e.target.value)}
//             style={{ width: "60%", display: "block", marginBottom: "0.5em" }}
//           />
//           <input
//             type="text"
//             placeholder="전송 ETH 양 (예: 0.1)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             style={{ width: "60%", display: "block", marginBottom: "0.5em" }}
//           />
//           <button onClick={sendEther}>전송</button>
//         </div></>)}
//     </div>
//   );
// }



///////////////////////////////////////////////////////////////////////////// Next.js에서 클라이언트 사이드
// "use client";
// import React, { useState } from "react";
// import { ethers } from "ethers";

// export default function Home() {
//   const [currentAccount, setCurrentAccount] = useState(null);

//   async function connectWallet() {
//     if (!window.ethereum) {
//       alert("MetaMask를 설치해주세요."); // MetaMask 미설치 대응
//       return;
//     }
//     try {
//       // 연결 요청 → 사용자가 MetaMask에서 승인하면 계정 배열 반환
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]); // 첫 번째 계정 설정
//       console.log("지갑 연결 성공:", accounts[0]);
//     } catch (error) {
//       // 오류 처리: 연결 요청 거부 등
//       if (error.code === 4001) {
//         // 4001: 사용자가 연결 요청을 거부
//         console.log("사용자가 지갑 연결을 취소했습니다.");
//       } else {
//         console.error(error);
//       }
//     }
//   }

//   return (
//     <div>
//       <button onClick={connectWallet}>지갑 연결</button>
//       {currentAccount && <p>지갑 연결됨: {currentAccount}</p>}
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////// 실습
// "use client"; // 클라이언트 컴포넌트 사용 선언
// import React, { useEffect, useState } from "react";

// export default function UpbitPricesPageTailwind() {
//   const [btcPrice, setBtcPrice] = useState(null);
//   const [ethPrice, setEthPrice] = useState(null);

//   // Upbit API 주소
//   const API_URL = "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH";

//   // 시세 불러오기 함수
//   const fetchPrices = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error("Upbit API 응답에 문제가 있습니다.");
//       }
//       const data = await response.json();
//       const btcData = data.find((item) => item.market === "KRW-BTC");
//       const ethData = data.find((item) => item.market === "KRW-ETH");

//       if (btcData) setBtcPrice(btcData.trade_price);
//       if (ethData) setEthPrice(ethData.trade_price);
//     } catch (error) {
//       console.error("시세 조회 오류:", error);
//       // 사용자에게 에러 메시지를 보여주는 상태 추가 고려
//     }
//   };

//   // 마운트 시점에 1초마다 fetchPrices 실행
//   useEffect(() => {
//     fetchPrices(); // 초기 로드
//     const intervalId = setInterval(fetchPrices, 1000); // 1초 간격 업데이트
//     return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
//   }, []);

//   return (
//     // Tailwind 클래스로 컨테이너 스타일링
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-center">
//       {/* Tailwind 클래스로 제목 스타일링 */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Upbit 시세 조회 (Tailwind CSS)
//       </h1>

//       {/* Tailwind 클래스로 가격 표시 박스 스타일링 */}
//       <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
//         <h2 className="text-lg font-semibold text-gray-700 mb-2">
//           비트코인 (BTC/KRW)
//         </h2>
//         <p className="text-xl text-blue-600 font-medium">
//           {btcPrice !== null ? (
//             `${btcPrice.toLocaleString()} 원`
//           ) : (
//             <span className="text-gray-400">불러오는 중...</span>
//           )}
//         </p>
//       </div>

//       {/* Tailwind 클래스로 가격 표시 박스 스타일링 */}
//       <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
//         <h2 className="text-lg font-semibold text-gray-700 mb-2">
//           이더리움 (ETH/KRW)
//         </h2>
//         <p className="text-xl text-green-600 font-medium">
//           {ethPrice !== null ? (
//             `${ethPrice.toLocaleString()} 원`
//           ) : (
//             <span className="text-gray-400">불러오는 중...</span>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }



///////////////////////////////////////////////////////////////////////////// 색상 및 배경
// Tailwind CSS 색상 및 배경 예시 컴포넌트
// "use client";
// import React from "react";

// export default function ColorBackgroundExample() {
//   return (
//     <div className="p-4 space-y-3">
//       <p className="text-red-600 font-semibold">
//         이 텍스트는 빨간색입니다 (text-red-600).
//       </p>

//       <div className="bg-blue-100 p-3 rounded">
//         <p className="text-blue-800">
//           이 영역은 파란색 배경(bg-blue-100)과 파란색 텍스트(text-blue-800)를 가집니다.
//         </p>
//       </div>

//       <div className="border-4 border-dashed border-purple-500 p-3">
//         이 영역은 두꺼운 보라색 점선 테두리(border-4 border-purple-500)를 가집니다.
//       </div>

//       <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded shadow">
//         호버 효과 버튼 (bg-yellow-400 hover:bg-yellow-500)
//       </button>

//       <p className="text-gray-500">
//         이 텍스트는 회색입니다 (text-gray-500).
//       </p>
//     </div>
//   );
// }



// ///////////////////////////////////////////////////////////////////////////// 타이포그래피
// "use client"; // 클라이언트 컴포넌트 사용 선언
// import React, { useEffect, useState } from "react";

// export default function TypographyExample() {
//   return (
//     <div className="p-4 space-y-4 font-sans text-gray-800">
//       <h1 className="text-3xl font-bold text-center mt-2">
//         타이포그래피 예시
//       </h1>
      
//       <p className="text-sm font-light leading-relaxed tracking-wide">
//         작은 크기의 가벼운 텍스트로 여유로운 줄 간격과 넓은 자간을 가지고 있습니다.
//       </p>
      
//       <p className="text-base font-normal">
//         기본 글꼴 크기와 보통 두께입니다.{" "}
//         <span className="font-serif italic">
//           세리프 글꼴 예시.
//         </span>
//       </p>
      
//       <p className="text-lg font-semibold text-blue-600">
//         더 큰 크기의 반굵은 파란색 텍스트입니다.
//       </p>
      
//       <p className="text-xl font-bold underline decoration-red-500">
//         특대 크기의 굵은 텍스트에 빨간색 밑줄이 있습니다.
//       </p>
      
//       <p className="text-right capitalize">
//         오른쪽 정렬된 텍스트로 각 단어의 첫 글자가 대문자입니다.
//       </p>
      
//       <p className="line-through text-gray-500">
//         이 텍스트에는 취소선이 있습니다.
//       </p>
      
//       <p className="uppercase tracking-tighter">
//         좁은 자간의 대문자 텍스트입니다.
//       </p>
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////// 박스 모델과 여백 클래스
// "use client"; // 클라이언트 컴포넌트 사용 선언
// import React, { useEffect, useState } from "react";

// export default function BoxModelExample() {
//   return (
//     <div className="m-6 p-4 bg-gray-100">
//       <p className="mb-2">내용 영역</p>
//       <button className="px-3 py-1 bg-blue-500 text-white">확인</button>
//     </div>
//   );
// }



///////////////////////////////////////////////////////////////////////////// Tailwind CSS Utility 클래스 예시
// "use client"; // 클라이언트 컴포넌트 사용 선언
// import React, { useEffect, useState } from "react";

// // Tailwind CSS 유틸리티 클래스 예시 컴포넌트
// export default function TailwindExampleComponent() {
//   return (
//     // 기본 레이아웃: flex 컨테이너, 패딩, 마진, 배경색, 테두리, 둥근 모서리, 그림자
//     <div className="flex flex-col items-center p-4 m-4 bg-blue-100 border border-blue-300 rounded-lg shadow-md max-w-md mx-auto">
//       {/* 텍스트 스타일링: 크기, 굵기, 정렬, 색상 */}
//       <h2 className="text-xl font-bold text-blue-800 mb-3">Tailwind 예시</h2>

//       {/* 내부 요소 레이아웃: 패딩, 마진, 너비 */}
//       <div className="bg-white p-3 m-2 w-full rounded shadow">
//         <p className="text-sm text-red-700 mb-2">
//           이 카드는{" "}
//           <span className="font-semibold text-red-600">Tailwind CSS</span>{" "}
//           클래스들을 사용하여 스타일링되었습니다.
//         </p>

//         {/* 인라인 블록과 텍스트 예시 */}
//         <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
//           태그 1
//         </span>
//         <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
//           태그 2
//         </span>
//       </div>

//       {/* 그리드 레이아웃 예시 */}
//       <div className="grid grid-cols-2 gap-2 w-full mt-3">
//         <div className="bg-purple-200 p-2 rounded text-center text-purple-800 text-sm">
//           그리드 1
//         </div>
//         <div className="bg-purple-200 p-2 rounded text-center text-purple-800 text-sm">
//           그리드 2
//         </div>
//       </div>
//     </div>
//   );
// }

// function BoxModelExample() {
//   return (
//     <div className="m-6 p-4 bg-gray-100">
//       <p className="mb-2">내용 영역</p>
//       <button className="px-3 py-1 bg-blue-500 text-white">확인</button>
//     </div>
//   );
// }



///////////////////////////////////////////////////////////////////////////// Upbit API 시세 조회 페이지
// "use client"; // 클라이언트 컴포넌트 사용 선언
// import React, { useEffect, useState } from "react";

// export default function UpbitPricesPage() {
//   const [btcPrice, setBtcPrice] = useState(null);
//   const [ethPrice, setEthPrice] = useState(null);
//   const [adaPrice, setAdaPrice] = useState(null);

//   // Upbit API 주소
//   const API_URL = "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-ADA";

//   // 시세 불러오기 함수
//   const fetchPrices = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error("Upbit API 응답에 문제가 있습니다.");
//       }

//       const data = await response.json();

//       const btcData = data.find((item) => item.market === "KRW-BTC");
//       const ethData = data.find((item) => item.market === "KRW-ETH");
//       const adaData = data.find((item) => item.market === "KRW-ADA");

//       if (btcData?.trade_price) setBtcPrice(btcData.trade_price);
//       if (ethData?.trade_price) setEthPrice(ethData.trade_price);
//       if (adaData?.trade_price) setAdaPrice(adaData.trade_price);
//     } catch (error) {
//       console.error("시세 조회 오류:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchPrices(); // 초기 호출
//     const intervalId = setInterval(fetchPrices, 3000); // ⚠️ 1초 → 3초로 변경 (API 차단 방지)
//     return () => clearInterval(intervalId); // 언마운트 시 인터벌 해제
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Upbit 시세 조회 (Next.js, JSX)</h1>

//       <PriceBox name="비트코인 (BTC/KRW)" price={btcPrice} />
//       <PriceBox name="이더리움 (ETH/KRW)" price={ethPrice} />
//       <PriceBox name="에이다 (ADA/KRW)" price={adaPrice} />
//     </div>
//   );
// }

// // 개별 시세 박스 컴포넌트 분리
// function PriceBox({ name, price }) {
//   return (
//     <div style={styles.priceBox}>
//       <h2>{name}</h2>
//       <p>{price !== null ? `${price.toLocaleString()} 원` : "불러오는 중..."}</p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     padding: "2rem",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: "1.5rem",
//     marginBottom: "1.5rem",
//   },
//   priceBox: {
//     marginBottom: "1rem",
//     padding: "1rem",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
// };


///////////////////////////////////////////////////////////////////////////// 컴포넌트 분리 및 재사용성
// "use client";
// import React from "react";
// import Image from "next/image";

// // 1. 재사용될 ProductCard 컴포넌트 정의
// function ProductCard({ name, price, imageUrl }) {
//   return (
//     <div
//       style={{
//         border: "1px solid lightgray",
//         padding: "15px",
//         margin: "10px",
//         width: "200px",
//         textAlign: "center",
//       }}
//     >
//       <img
//         src={imageUrl}
//         alt={name}
//         style={{ width: "100%", height: "150px", objectFit: "cover" }}
//       />
//       <h3>{name}</h3>
//       <p>{price.toLocaleString()}원</p>
//       <button>장바구니 담기</button>
//     </div>
//   );
// }
// // 상품 데이터 예시
// const products = [
//   {
//     id: 1,
//     name: "노트북",
//     price: 1200000,
//     width: 100,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-eRVm8FSu8qqWSiMqxRrh5sDQXuPRlhR5A&s",
//   },
//   {
//     id: 2,
//     name: "키보드",
//     price: 85000,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6B9lOLraqWFRITrOLd7qGj3057KPCg6L0NQ&s",
//   },
//   {
//     id: 3,
//     name: "마우스",
//     price: 40000,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiGO7Ds5M64JFxdyfFo4trJvt0snhE0UB87g&s",
//   },
// ];

// // 메인 페이지 컴포넌트
// export default function ComponentReusabilityPage() {
//   return (
//     <div>
//       <h1>컴포넌트 분리 및 재사용 예시</h1>
//       <p>ProductCard 컴포넌트를 여러 번 재사용하여 상품 목록을 표시합니다.</p>
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {/* 2. ProductCard 컴포넌트 반복 사용 */}
//         {products.map((product) => (
//           <ProductCard
//             key={product.id} // 리스트 렌더링 시 고유 key 필요
//             id={product.id}
//             name={product.name}
//             price={product.price}
//             imageUrl={product.imageUrl}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



///////////////////////////////////////////////////////////////////////////// 배열 메서드
// "use client";
// import React, { useState } from "react";

// const users = [
//   { id: 1, name: "Alice", role: "Admin" },
//   { id: 2, name: "Bob", role: "User" },
//   { id: 3, name: "Charlie", role: "User" },
//   { id: 4, name: "David", role: "Admin" },
// ];

// export default function ArrayMethodsPage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // 1. filter: 검색어(searchTerm)가 이름에 포함된 사용자만 필터링
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h1>배열 메서드 활용 예시 (map, filter)</h1>
//       <input
//         type="text"
//         placeholder="이름으로 검색..."
//         value={searchTerm}
//         onChange={e => setSearchTerm(e.target.value)}
//         style={{ marginBottom: "15px", padding: "8px" }}
//       />
//       <h2>사용자 목록 (총 {filteredUsers.length}명)</h2>
//       <ul>
//         {filteredUsers.map(user => (
//           <li key={user.id}>
//             <strong>{user.name}</strong> ({user.role})
//           </li>
//         ))}
//       </ul>
//       {filteredUsers.length === 0 && <p>검색 결과가 없습니다.</p>}
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////// useEffect
// "use client";
// import React, { useState, useEffect } from "react";

// // TimerComponent: useEffect로 타이머 관리
// function TimerComponent() {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     // --- Effect 실행 코드 ---
//     console.log("TimerComponent 마운트됨 / 초 업데이트됨!");

//     // 1초마다 seconds state를 1씩 증가시키는 타이머 설정
//     const intervalId = setInterval(() => {
//       setSeconds((s) => s + 1);
//       console.log("타이머 작동 중...");
//     }, 1000);

//     // --- Cleanup 함수 ---
//     // 컴포넌트가 언마운트되거나, useEffect가 재실행되기 전에 호출됨
//     return () => {
//       console.log("TimerComponent 언마운트 / 타이머 정리!");
//       clearInterval(intervalId); // 설정된 타이머 해제
//     };
//   }, []); // 빈 배열: 마운트 시 1회만 실행, 언마운트 시 1회만 정리

//   return <p>타이머: {seconds}초 경과</p>;
// }

// export default function UseEffectExamplePage() {
//   const [isVisible, setIsVisible] = useState(true);

//   return (
//     <div>
//       <h1>useEffect 훅 예시</h1>
//       <button onClick={() => setIsVisible(!isVisible)}>
//         컴포넌트 {isVisible ? "숨기기" : "보이기"}
//       </button>

//       {/* isVisible 상태에 따라 TimerComponent 렌더링 제어 */}
//       {isVisible && <TimerComponent />}
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////// 이벤트 처리
// "use client"; // 이벤트 핸들러 사용을 위해 필요
// import React from "react";

// export default function BasicEventPage() {
//   // 버튼 클릭 시 실행될 함수
//   const handleButtonClick = () => {
//     console.log("버튼이 클릭되었습니다!");
//     // 여기에서 상태 업데이트(useState 사용) 등 다른 작업을 수행할 수 있습니다.
//   };

//   const handleChange = (e) =>{
//     console.log(e);
//   }

//   return (
//     <div>
//       <h1>기본 이벤트 처리 예시</h1>
//       <p>버튼을 클릭하면 브라우저 콘솔에 메시지가 출력됩니다.</p>
//       <button onClick={handleButtonClick}>클릭하여 콘솔 로그 확인</button>
//       <input onChange={handleChange} type="text" />
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////// 컴포넌트
// import React from "react";

// // 1. WelcomeMessage 컴포넌트 정의 (함수형 컴포넌트)
// // props 객체를 매개변수로 받아 사용합니다.
// function WelcomeMessage(props) {
//   return <p>안녕하세요, {props.name}님! 컴포넌트에 오신 것을 환영합니다.</p>;
// }

// // 메인 페이지 컴포넌트
// export default function ComponentExamplePage() {
//   return (
//     <div>
//       <h1>컴포넌트 예시</h1>
//       <p>아래는 WelcomeMessage 컴포넌트를 사용한 결과입니다:</p>

//       {/* 2. WelcomeMessage 컴포넌트 사용 */}
//       {/* HTML 태그처럼 사용하며, name 속성(prop)으로 데이터를 전달합니다. */}
//       <WelcomeMessage name="김철수" />
//       <WelcomeMessage name="이영희" />
//       <WelcomeMessage name="홍길동" />

//       <p>컴포넌트를 사용하면 UI 코드를 재사용하고 구조화하기 좋습니다.</p>
//     </div>
//   );
// }


