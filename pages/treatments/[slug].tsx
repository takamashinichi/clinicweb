import React from 'react';
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { getEntries, getEntryBySlug } from "@/lib/contentful";
import Layout from '@/components/Layout';

type Treatment = {
  sys: { id: string };
  fields: { 
    title: string; 
    description: string; 
    slug: string;
  };
};

// デモデータ
const demoTreatments = {
  'botox': {
    sys: { id: 'demo1' },
    fields: {
      title: 'シワ取り注射',
      description: 'シワ取り注射はボトックス注射とも呼ばれ、表情じわの改善に効果的な施術です。注射により表情筋の動きを穏やかにすることで、しわの発生を抑制します。特に眉間のしわや額のしわ、目尻のしわに効果的です。\n\n当クリニックでは、自然な表情を残しながら、目立つシワだけを改善する施術をご提供します。経験豊富な医師が適切な量を適切な場所に注入することで、不自然にならない美しい仕上がりを実現します。効果は3〜6ヶ月持続し、その後徐々に元に戻るため、定期的な施術をおすすめします。',
      slug: 'botox'
    }
  },
  'hyaluronic-acid': {
    sys: { id: 'demo2' },
    fields: {
      title: 'ほうれい線のヒアルロン酸注射',
      description: 'ほうれい線のヒアルロン酸注射は、年齢とともに現れるほうれい線を目立たなくする効果的な施術です。ヒアルロン酸を注入することでボリュームを補い、若々しい印象に導きます。\n\nヒアルロン酸は人体にもともと存在する成分であるため、アレルギー反応が少なく安全性が高いのが特徴です。当クリニックでは、自然で違和感のない仕上がりを重視し、お客様の顔の特徴に合わせたオーダーメイドの施術を行います。効果は6ヶ月〜1年程度持続し、その後徐々に体内に吸収されていきます。',
      slug: 'hyaluronic-acid'
    }
  },
  'stem-cell': {
    sys: { id: 'demo3' },
    fields: {
      title: '若返り細胞注射',
      description: '若返り細胞注射（ピュアスキン）は、ご自身の細胞を活用した最先端の若返り治療です。肌の再生力を高め、シワやたるみの改善、肌質の向上など、総合的な若返り効果が期待できます。\n\n治療では、お客様自身の細胞を使用するため、アレルギーなどの副作用のリスクが極めて低いのが特徴です。細胞の持つ再生能力を活かし、肌のハリや弾力の改善、きめの細かさ、透明感の向上など、様々な効果が期待できます。また、肌の奥から若返らせるため、自然な若さを取り戻すことができます。',
      slug: 'stem-cell'
    }
  },
  'face-slimming': {
    sys: { id: 'demo4' },
    fields: {
      title: 'エラ小顔注射',
      description: 'エラ小顔注射は、咬筋（エラの筋肉）を縮小させることで、四角い顔を小さく見せる効果がある施術です。エラが張っている方や、顔の輪郭が気になる方に特におすすめです。\n\nこの施術は、ボトックス注射を咬筋に注入することで、過剰に発達した筋肉を弱め、徐々に小さくしていきます。手術不要で、短時間で終わるため、ダウンタイムがほとんどなく、忙しい方でも気軽に受けることができます。効果は約3〜6ヶ月持続し、定期的に受けることで、より長期的な効果も期待できます。',
      slug: 'face-slimming'
    }
  },
  'laser-tightening': {
    sys: { id: 'demo5' },
    fields: {
      title: 'レーザータイトニング / スキンタイトニング',
      description: 'レーザータイトニングとスキンタイトニングは、肌の引き締めや若返りに効果的な非侵襲的な治療法です。レーザーの熱エネルギーが真皮層に働きかけ、コラーゲンの生成を促進します。\n\nこの施術の大きな特徴は、ダウンタイムがほとんどなく、徐々に効果が現れる自然な若返りが得られることです。肌のハリや弾力の改善、毛穴の引き締め、小じわの改善などの効果が期待できます。複数回の施術を重ねることで、効果がより顕著になります。メスを使わず、痛みも少ないため、手軽に始められる若返り治療として人気です。',
      slug: 'laser-tightening'
    }
  },
  'hydra-facial': {
    sys: { id: 'demo6' },
    fields: {
      title: '水流ピーリング（ハイドラフェイシャル）',
      description: '水流ピーリング（ハイドラフェイシャル）は、水流の力で肌を優しく洗浄しながら、同時に美容成分を導入する革新的な施術です。毛穴の汚れや古い角質を除去し、クリアな肌へと導きます。\n\n従来のピーリングと異なり、肌への刺激が少なく、敏感肌の方でも受けやすいのが特徴です。クレンジング、ピーリング、吸引、美容液の導入をオールインワンで行うため、短時間で高い効果を得ることができます。毛穴の詰まりや黒ずみの改善、くすみの解消、肌のトーンアップなど、様々な肌悩みに対応しています。',
      slug: 'hydra-facial'
    }
  }
};

export default function TreatmentDetail({ treatment, isDemo = false }: { treatment: Treatment, isDemo?: boolean }) {
  // 改行をパラグラフに変換する関数
  const formatDescription = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <Layout title={treatment.fields.title}>
      <div className="max-w-4xl mx-auto">
        {isDemo && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r">
            <p className="text-red-700">※Contentfulからデータを取得できませんでした。デモデータを表示しています。</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="bg-blue-600 text-white p-8">
            <h1 className="text-3xl md:text-4xl font-bold">{treatment.fields.title}</h1>
          </div>
          
          {/* コンテンツ部分 */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              {formatDescription(treatment.fields.description)}
            </div>
            
            {/* 料金セクション */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">施術料金</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-gray-600">初回カウンセリング込み (60分)</p>
                  <p className="text-2xl font-bold text-blue-800">¥15,000 <span className="text-sm font-normal">(税込)</span></p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-gray-600">通常施術 (40分)</p>
                  <p className="text-2xl font-bold text-blue-800">¥12,000 <span className="text-sm font-normal">(税込)</span></p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">※料金は目安です。詳細はカウンセリング時にご説明いたします。</p>
            </div>
            
            {/* 施術の流れ */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">施術の流れ</h2>
              <ol className="space-y-4">
                {[
                  { title: 'カウンセリング', desc: 'お客様のお悩みや肌の状態をヒアリングします' },
                  { title: '施術の説明', desc: '施術内容や効果、リスクについて詳しくご説明します' },
                  { title: '施術', desc: '医師または看護師が丁寧に施術を行います' },
                  { title: 'アフターケア', desc: '施術後のケア方法や次回のご予約についてご案内します' }
                ].map((step, index) => (
                  <li key={index} className="flex">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-blue-800">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        
        {/* ナビゲーション */}
        <div className="mt-12 flex justify-between">
          <Link href="/treatments">
            <span className="inline-block text-blue-600 hover:text-blue-800 font-medium">
              ← 施術一覧に戻る
            </span>
          </Link>
          <Link href="/reservation">
            <span className="inline-block text-blue-600 hover:text-blue-800 font-medium">
              予約する →
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const treatments = await getEntries("treatment");
    return {
      paths: treatments.map((treatment: any) => ({ params: { slug: treatment.fields.slug } })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Contentfulからパスデータの取得に失敗しました:", error);
    // デモデータのパスを使用
    return {
      paths: Object.keys(demoTreatments).map(slug => ({ params: { slug } })),
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  try {
    const treatment = await getEntryBySlug("treatment", slug);
    
    if (!treatment) {
      // Contentfulにデータはあるが、指定されたslugのデータがない場合
      // デモデータからの提供を試みる
      if (demoTreatments[slug as keyof typeof demoTreatments]) {
        return { 
          props: { 
            treatment: demoTreatments[slug as keyof typeof demoTreatments],
            isDemo: true
          }
        };
      }
      return { notFound: true };
    }
    
    return { 
      props: { 
        treatment,
        isDemo: false
      }, 
      revalidate: 60 
    };
  } catch (error) {
    console.error("Contentfulからデータの取得に失敗しました:", error);
    
    // エラー時にデモデータを提供
    if (demoTreatments[slug as keyof typeof demoTreatments]) {
      return { 
        props: { 
          treatment: demoTreatments[slug as keyof typeof demoTreatments],
          isDemo: true
        }
      };
    }
    
    return { notFound: true };
  }
}; 