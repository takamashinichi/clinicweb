import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const demoTreatments = [
  {
    id: '1',
    title: '美容鍼',
    description: '美容鍼は顔のツボを刺激することで、肌のハリや血行を改善します。定期的な施術により、シワやたるみの改善にも効果的です。',
    slug: 'beauty-acupuncture'
  },
  {
    id: '2',
    title: '全身鍼',
    description: '全身の調子を整え、様々な不調を改善します。肩こりや腰痛、頭痛などの痛みの緩和に効果があります。',
    slug: 'full-body-acupuncture'
  },
  {
    id: '3',
    title: '骨盤矯正',
    description: '骨盤のゆがみを整えることで、姿勢や腰痛の改善に効果があります。身体のバランスを整え、健康な体へと導きます。',
    slug: 'pelvic-correction'
  }
];

export default function DemoPage() {
  return (
    <Layout title="デモページ">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                このページはContentfulなしで表示されるデモページです。実際の施術メニューは
                <Link href="/treatments">
                  <span className="font-medium text-yellow-700 underline hover:text-yellow-600">
                    施術メニューページ
                  </span>
                </Link>
                をご覧ください。
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">デモ施術メニュー</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {demoTreatments.map((treatment) => (
            <div key={treatment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-100 text-teal-600 p-2 rounded-full mr-3">
                    {treatment.id === '1' ? '💆‍♀️' : treatment.id === '2' ? '👨‍⚕️' : '🧘‍♀️'}
                  </div>
                  <h2 className="text-xl font-semibold text-teal-700">{treatment.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{treatment.description}</p>
                <div className="mt-2 flex justify-end">
                  <Link href={`/treatments/${treatment.slug}`}>
                    <span className="inline-block bg-teal-600 text-white py-2 px-4 rounded font-medium hover:bg-teal-700 transition duration-300">
                      詳しく見る
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/">
            <span className="inline-block text-teal-600 hover:text-teal-800 font-medium">
              ← ホームに戻る
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
} 