import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { getClinicInfo, getPopularTreatments, getActiveCampaigns, getDoctors, getNotices } from '@/lib/strapi';
import { StrapiResponse, StrapiSingleResponse, Treatment, Campaign, Doctor, Notice, StrapiRichText } from '@/lib/strapi';
import RichTextRenderer from '@/components/RichTextRenderer';

type HomePageProps = {
  clinicInfo: any;
  popularTreatments: StrapiResponse<Treatment>['data'];
  campaigns: StrapiResponse<Campaign>['data'];
  doctors: StrapiResponse<Doctor>['data'];
  notices: StrapiResponse<Notice>['data'];
  isDemo: boolean;
};

// デモデータ用コンポーネント
const DemoWarning = () => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r">
    <p className="text-red-700">※Strapiからデータを取得できませんでした。デモデータを表示しています。</p>
  </div>
);

export default function HomePage({ 
  clinicInfo, 
  popularTreatments = [], 
  campaigns = [], 
  doctors = [],
  notices = [],
  isDemo = true 
}: HomePageProps) {
  return (
    <Layout title="ホーム">
      {isDemo && <DemoWarning />}
      
      {/* メインビジュアルセクション */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200">
          {/* 実際の画像に置き換えることをお勧めします */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 flex items-center">
              <div className="bg-blue-700 text-white py-3 px-8 ml-20 inline-block rounded-r-full">
                <div className="text-2xl font-bold">人気の美容医療</div>
                <div className="text-lg">ANTIAGING × SKINCARE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 施術メニューセクション */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Strapiからデータが取得できればそれを表示、なければデモデータを表示 */}
          {popularTreatments.map((treatment) => (
            <div key={treatment.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              <div className="p-6">
                <div className="mb-4 text-center text-sm">
                  <div className="text-gray-700">{treatment.attributes.shortDescription}</div>
                </div>
                <div className="text-center text-xl font-bold text-blue-600 mb-6">
                  {treatment.attributes.title}
                </div>
                <div className="flex justify-center">
                  <Link href={`/treatments/${treatment.attributes.slug}`}>
                    <span className="text-blue-600 flex items-center hover:text-blue-800">
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
      </section>

      {/* バナーセクション */}
      <section className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.length > 0 ? (
            // Strapiから取得したキャンペーン情報を表示
            campaigns.map(campaign => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex">
                  <div className="w-1/3 bg-yellow-50">
                    {campaign.attributes.image && campaign.attributes.image.data && (
                      <img 
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${campaign.attributes.image.data.attributes.url}`} 
                        alt={campaign.attributes.image.data.attributes.alternativeText || campaign.attributes.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="w-2/3 pl-4">
                    <h3 className="text-lg font-bold text-yellow-800">{campaign.attributes.title}</h3>
                    <div className="text-sm text-gray-600">
                      {/* リッチテキストの場合はRichTextRendererを使用する */}
                      {campaign.attributes.description && 
                        <RichTextRenderer content={campaign.attributes.description} className="line-clamp-2" />
                      }
                    </div>
                    <div className="mt-2 text-xl font-bold">
                      ¥{campaign.attributes.campaignPrice.toLocaleString()}<span className="text-xs">(税込)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // デモキャンペーンを表示
            <>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex">
                  <div className="w-1/3 bg-yellow-50"></div>
                  <div className="w-2/3 pl-4">
                    <h3 className="text-lg font-bold text-yellow-800">日焼け対策点滴</h3>
                    <p className="text-sm text-gray-600">体内から日焼け対策</p>
                    <p className="text-sm text-gray-600">透明感ある美白肌へ</p>
                    <div className="mt-2 text-xl font-bold">¥7,500<span className="text-xs">(税込)</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex">
                  <div className="w-1/3 bg-blue-50"></div>
                  <div className="w-2/3 pl-4">
                    <h3 className="text-lg font-bold text-blue-800">ヒアルロン酸施術</h3>
                    <p className="text-sm text-gray-600">理想のフェイスラインへ</p>
                    <div className="mt-2 text-xl font-bold">¥210,000<span className="text-xs">(税込)</span></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 医師紹介セクション */}
      {doctors.length > 0 && (
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">医師紹介</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map(doctor => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {doctor.attributes.photo && doctor.attributes.photo.data && (
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${doctor.attributes.photo.data.attributes.url}`} 
                        alt={doctor.attributes.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-700 mb-1">{doctor.attributes.name}</h3>
                    <p className="text-gray-600 mb-2">{doctor.attributes.title}</p>
                    <p className="text-gray-600 text-sm mb-4">{doctor.attributes.specialty}</p>
                    <Link href={`/doctors/${doctor.id}`}>
                      <span className="text-blue-600 hover:text-blue-800">プロフィールを見る →</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* お知らせセクション */}
      {notices.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">お知らせ</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {notices.map(notice => (
                <li key={notice.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className={`inline-block px-2 py-1 text-xs ${
                        notice.attributes.isImportant ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      } rounded-full`}>
                        {notice.attributes.category}
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm text-gray-500">
                        {new Date(notice.attributes.publishDate).toLocaleDateString('ja-JP')}
                      </div>
                      <div className="text-base font-medium text-gray-900">
                        {notice.attributes.title}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link href={`/news/${notice.id}`}>
                        <span className="text-blue-600 hover:text-blue-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center mt-6">
            <Link href="/news">
              <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                お知らせ一覧へ
              </span>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Strapiからデータを取得
    const [clinicInfo, popularTreatments, campaigns, doctors, notices] = await Promise.all([
      getClinicInfo(),
      getPopularTreatments(),
      getActiveCampaigns(),
      getDoctors(),
      getNotices(5)  // 最新5件のお知らせを取得
    ]);
    
    return { 
      props: { 
        clinicInfo,
        popularTreatments,
        campaigns,
        doctors,
        notices,
        isDemo: false
      }, 
      revalidate: 60  // ISR: 60秒ごとに再生成
    };
  } catch (error) {
    console.error("Strapiからデータの取得に失敗しました:", error);
    
    // エラー時にはデモデータを提供
    return { 
      props: { 
        clinicInfo: null,
        popularTreatments: [],
        campaigns: [],
        doctors: [],
        notices: [],
        isDemo: true
      },
      revalidate: 30  // エラー時は短い間隔で再試行
    };
  }
}; 