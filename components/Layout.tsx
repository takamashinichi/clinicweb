import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function Layout({ children, title = 'クリニック' }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>{title} | 代々木駅前美容クリニック</title>
        <meta name="description" content="代々木駅東口より徒歩1分、優しい女性医師の美容皮膚科" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* お知らせバー */}
      <div className="bg-blue-700 text-white text-center py-2 text-sm">
        代々木駅東口より徒歩1分、優しい女性医師の美容皮膚科 | 代々木駅前美容クリニック
      </div>

      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center">
              <div className="text-blue-700 text-4xl font-bold mr-2">V</div>
              <div className="leading-tight">
                <div className="text-xl font-bold text-blue-700">代々木駅前</div>
                <div className="text-lg font-medium text-blue-700">美容クリニック</div>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* ナビゲーション */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center">
            <li className="py-4 px-4 hover:bg-blue-700 transition duration-300">
              <Link href="/">
                <span className="font-medium">HOME</span>
              </Link>
            </li>
            <li className="py-4 px-4 hover:bg-blue-700 transition duration-300">
              <Link href="/clinic">
                <span className="font-medium">クリニック紹介</span>
              </Link>
            </li>
            <li className="py-4 px-4 hover:bg-blue-700 transition duration-300">
              <Link href="/calendar">
                <span className="font-medium">診療カレンダー</span>
              </Link>
            </li>
            <li className="py-4 px-4 hover:bg-blue-700 transition duration-300">
              <Link href="/reservation">
                <span className="font-medium">WEB予約</span>
              </Link>
            </li>
            <li className="py-4 px-4 hover:bg-blue-700 transition duration-300">
              <Link href="/line">
                <span className="font-medium">LINE</span>
              </Link>
            </li>
            <li className="py-4 px-4 bg-white text-blue-700 flex flex-col items-center">
              <span className="text-xs mb-1">初診・再診のお客様</span>
              <span className="font-bold">☎ 03-5315-0201</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="flex-grow">
        {children}
      </main>

      {/* フッター */}
      <footer className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">代々木駅前美容クリニック</h3>
              <p className="text-blue-100">
                最高品質の施術と心のこもったサービスで、
                皆様の健康と美をサポートします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">営業時間</h3>
              <p className="text-blue-100">平日: 9:00 - 20:00</p>
              <p className="text-blue-100">土曜: 9:00 - 18:00</p>
              <p className="text-blue-100">日曜・祝日: 休診</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
              <p className="text-blue-100">📞 03-5315-0201</p>
              <p className="text-blue-100">📍 東京都渋谷区代々木1-2-3</p>
            </div>
          </div>
          <div className="border-t border-blue-500 mt-8 pt-6 text-center text-blue-100">
            <p>© {new Date().getFullYear()} 代々木駅前美容クリニック. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 