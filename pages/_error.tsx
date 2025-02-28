import React from 'react';
import { NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';

type ErrorProps = {
  statusCode: number;
};

function Error({ statusCode }: ErrorProps) {
  return (
    <Layout title="エラーが発生しました">
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-6xl font-bold mb-4">{statusCode || '⚠️'}</div>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {statusCode
              ? `${statusCode} - サーバーでエラーが発生しました`
              : 'クライアントでエラーが発生しました'}
          </h1>
          <p className="text-gray-600 mb-8">
            申し訳ありませんが、問題が発生しました。しばらくしてから再度お試しください。
          </p>
          
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              <Link href="/">
                <span className="px-5 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition duration-300">
                  ホームに戻る
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 