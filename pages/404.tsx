import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Custom404() {
  return (
    <Layout title="ページが見つかりません">
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-teal-600 text-8xl font-bold mb-4">404</div>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">ページが見つかりません</h1>
          <p className="text-gray-600 mb-8">お探しのページは存在しないか、移動した可能性があります。</p>
          
          <div className="space-y-6">
            <p className="text-gray-700 font-medium">以下のリンクからアクセスできます：</p>
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <span className="px-5 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition duration-300">
                  ホーム
                </span>
              </Link>
              <Link href="/treatments">
                <span className="px-5 py-2 bg-white border border-teal-600 text-teal-600 rounded-full hover:bg-teal-50 transition duration-300">
                  施術メニュー
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 