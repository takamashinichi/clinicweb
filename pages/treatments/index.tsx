import React from 'react';
import { GetStaticProps } from "next";
import Link from "next/link";
import { getEntries } from "@/lib/contentful";
import Layout from '@/components/Layout';

type Treatment = {
  sys: { id: string };
  fields: { 
    title: string; 
    description: string; 
    slug: string;
  };
};

// デモデータ - Contentfulからデータが取得できない場合に使用
const fallbackTreatments = [
  {
    sys: { id: 'demo1' },
    fields: {
      title: 'シワ取り注射',
      description: '眉間に刻まれたシワを解消し、理想の表情へ導きます。自然な表情を保ちながらシワを改善します。表情筋の過度な収縮を抑制することでシワの発生も予防できます。',
      slug: 'botox'
    }
  },
  {
    sys: { id: 'demo2' },
    fields: {
      title: 'ほうれい線のヒアルロン酸注射',
      description: '加齢と共に目立つ、頬の皮膚のたるみを改善します。ほうれい線を埋めることで若々しい印象に。自然な仕上がりで満足度の高い施術です。',
      slug: 'hyaluronic-acid'
    }
  },
  {
    sys: { id: 'demo3' },
    fields: {
      title: '若返り細胞注射',
      description: 'シワや肌の弾力アップ、保湿・美白効果が期待できます。自分自身の細胞を活用するため、アレルギー反応などの心配がほとんどありません。',
      slug: 'stem-cell'
    }
  },
  {
    sys: { id: 'demo4' },
    fields: {
      title: 'エラ小顔注射',
      description: '注射だけで簡単、憧れの綺麗な美人顔へ。エラの筋肉を縮小させることでスッキリとした小顔効果が得られます。メスを使わない安全な施術です。',
      slug: 'face-slimming'
    }
  },
  {
    sys: { id: 'demo5' },
    fields: {
      title: 'レーザータイトニング',
      description: '新生コラーゲンの増加、切らずにリフトアップします。レーザーの熱作用でコラーゲンの生成を促進し、肌のハリと弾力を改善します。',
      slug: 'laser-tightening'
    }
  },
  {
    sys: { id: 'demo6' },
    fields: {
      title: '水流ピーリング',
      description: '毛穴の開き、毛穴の黒ずみをキレイにします。水流の力で優しく汚れを吸引し、同時に美容成分を注入することで、クリアな肌へと導きます。',
      slug: 'hydra-facial'
    }
  }
];

export default function TreatmentsPage({ treatments, isDemo = false }: { treatments: Treatment[], isDemo?: boolean }) {
  return (
    <Layout title="施術メニュー">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダーセクション */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">施術メニュー</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            代々木駅前美容クリニックでは、お客様一人ひとりの肌質や状態に合わせた
            最適な美容施術をご提案しています。
            豊富な経験を持つ女性専門医師が丁寧に対応いたします。
          </p>
        </div>
        
        {isDemo && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r">
            <p className="text-red-700">※Contentfulからデータを取得できませんでした。デモデータを表示しています。</p>
          </div>
        )}
        
        {treatments.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">現在、施術情報を準備中です。</p>
            <p className="text-gray-500 mt-2">もうしばらくお待ちください。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <div key={treatment.sys.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue-700 mb-3 text-center">{treatment.fields.title}</h2>
                  <p className="text-gray-600 mb-4 text-sm">{treatment.fields.description}</p>
                  <div className="flex justify-center">
                    <Link href={`/treatments/${treatment.fields.slug}`}>
                      <span className="inline-block text-blue-600 py-2 px-4 rounded font-medium hover:text-blue-800 transition duration-300 flex items-center">
                        詳しく見る
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/">
            <span className="inline-block text-blue-600 hover:text-blue-800 font-medium">
              ← ホームに戻る
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const treatments = await getEntries("treatment");
    return { 
      props: { 
        treatments,
        isDemo: false
      }, 
      revalidate: 60 
    };
  } catch (error) {
    console.error("Contentfulからデータの取得に失敗しました:", error);
    return { 
      props: { 
        treatments: fallbackTreatments,
        isDemo: true
      },
      revalidate: 30
    };
  }
}; 