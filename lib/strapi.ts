import { strapi } from '@strapi/client';

// API基本URL
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Strapiクライアントインスタンスの作成
// APIトークンが設定されていない場合は、認証なしでクライアントを初期化
const client = strapi({
  baseURL: `${API_URL}/api`,
  auth: API_TOKEN !== 'dummy-api-token' ? API_TOKEN : undefined,
});

// デモデータかどうかのフラグ
const isDemo = !API_TOKEN || API_TOKEN === 'dummy-api-token';

// デモデータ（Strapiサーバーが利用できない場合用）
const demoClinicInfo = {
  id: 1,
  attributes: {
    clinicName: '代々木駅前美容クリニック（デモ）',
    shortDescription: '最新の美容医療技術を提供する、女性に寄り添った美容クリニックです。',
    fullDescription: {
      type: 'document',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: '当クリニックは、最新の美容医療技術と温かい対応で、患者様一人ひとりに合わせた最適な治療を提供いたします。女性専門の医師が診療しますので、デリケートなお悩みも安心してご相談いただけます。' }]
        }
      ]
    },
    address: '東京都渋谷区代々木1-2-3',
    phoneNumber: '03-1234-5678',
    logo: {
      data: {
        id: 1,
        attributes: {
          name: 'logo.png',
          alternativeText: 'クリニックロゴ',
          caption: '',
          width: 200,
          height: 80,
          formats: {
            thumbnail: { url: '/placeholder-logo.png', width: 200, height: 80 },
            small: { url: '/placeholder-logo.png', width: 200, height: 80 },
            medium: { url: '/placeholder-logo.png', width: 200, height: 80 },
            large: { url: '/placeholder-logo.png', width: 200, height: 80 }
          },
          url: '/placeholder-logo.png'
        }
      }
    },
    heroImage: {
      data: {
        id: 2,
        attributes: {
          name: 'hero.jpg',
          alternativeText: 'クリニックの内装',
          caption: '',
          width: 1200,
          height: 600,
          formats: {
            thumbnail: { url: '/placeholder-hero.jpg', width: 300, height: 150 },
            small: { url: '/placeholder-hero.jpg', width: 600, height: 300 },
            medium: { url: '/placeholder-hero.jpg', width: 900, height: 450 },
            large: { url: '/placeholder-hero.jpg', width: 1200, height: 600 }
          },
          url: '/placeholder-hero.jpg'
        }
      }
    },
    openingHours: [
      { id: 1, day: '月～金', hours: '10:00～19:00' },
      { id: 2, day: '土', hours: '10:00～17:00' },
      { id: 3, day: '日・祝', hours: '休診' }
    ],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    publishedAt: '2023-01-01T00:00:00.000Z'
  }
};

const demoDoctors = [
  {
    id: 1,
    attributes: {
      name: '山田 花子',
      title: '院長 / 美容皮膚科医',
      specialty: '美容皮膚科、アンチエイジング',
      profile: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '東京大学医学部卒業後、大学病院で皮膚科医として10年の経験を積む。その後、美容医療の道へ進み、国内外で研鑽を重ねる。2018年に代々木駅前美容クリニックを開院。' }]
          }
        ]
      },
      message: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '美容医療は単に見た目を変えるだけではなく、患者様の心の健康にも影響を与える大切な医療です。一人ひとりのお悩みに寄り添い、最適な治療法をご提案いたします。' }]
          }
        ]
      },
      photo: {
        data: {
          id: 3,
          attributes: {
            name: 'doctor1.jpg',
            alternativeText: '山田花子先生',
            caption: '',
            width: 400,
            height: 600,
            formats: {
              thumbnail: { url: '/placeholder-doctor.jpg', width: 100, height: 150 },
              small: { url: '/placeholder-doctor.jpg', width: 200, height: 300 },
              medium: { url: '/placeholder-doctor.jpg', width: 300, height: 450 },
              large: { url: '/placeholder-doctor.jpg', width: 400, height: 600 }
            },
            url: '/placeholder-doctor.jpg'
          }
        }
      },
      order: 1,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z'
    }
  }
];

const demoTreatments = [
  {
    id: 1,
    attributes: {
      title: 'シワ取り注射',
      slug: 'botox',
      shortDescription: '表情じわの改善に効果的な施術です。注射により表情筋の動きを穏やかにすることで、しわの発生を抑制します。',
      description: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'シワ取り注射はボトックス注射とも呼ばれ、表情じわの改善に効果的な施術です。注射により表情筋の動きを穏やかにすることで、しわの発生を抑制します。特に眉間のしわや額のしわ、目尻のしわに効果的です。' }]
          }
        ]
      },
      effects: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '施術後すぐに効果が現れ始め、3〜5日で効果が表れます。効果は個人差がありますが、通常3〜6ヶ月持続します。' }]
          }
        ]
      },
      risks: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '注射部位の軽い痛み、赤み、内出血などが起こる場合があります。まれに、頭痛や一時的な表情の非対称などの副作用が現れることもあります。' }]
          }
        ]
      },
      thumbnail: {
        data: {
          id: 4,
          attributes: {
            name: 'botox-thumb.jpg',
            alternativeText: 'シワ取り注射',
            caption: '',
            width: 400,
            height: 300,
            formats: {
              thumbnail: { url: '/placeholder-treatment.jpg', width: 100, height: 75 },
              small: { url: '/placeholder-treatment.jpg', width: 200, height: 150 },
              medium: { url: '/placeholder-treatment.jpg', width: 300, height: 225 },
              large: { url: '/placeholder-treatment.jpg', width: 400, height: 300 }
            },
            url: '/placeholder-treatment.jpg'
          }
        }
      },
      featuredImage: {
        data: {
          id: 5,
          attributes: {
            name: 'botox-featured.jpg',
            alternativeText: 'シワ取り注射施術',
            caption: '',
            width: 800,
            height: 600,
            formats: {
              thumbnail: { url: '/placeholder-treatment-large.jpg', width: 200, height: 150 },
              small: { url: '/placeholder-treatment-large.jpg', width: 400, height: 300 },
              medium: { url: '/placeholder-treatment-large.jpg', width: 600, height: 450 },
              large: { url: '/placeholder-treatment-large.jpg', width: 800, height: 600 }
            },
            url: '/placeholder-treatment-large.jpg'
          }
        }
      },
      prices: [
        { id: 1, title: '初回施術', amount: 15000, unit: '円（税込）' },
        { id: 2, title: '2回目以降', amount: 12000, unit: '円（税込）' }
      ],
      category: {
        data: {
          id: 1,
          attributes: {
            name: '注入治療',
            slug: 'injection',
            description: '注射による施術メニュー',
            icon: 'injection',
            order: 1,
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z'
          }
        }
      },
      isPopular: true,
      order: 1,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z'
    }
  },
  {
    id: 2,
    attributes: {
      title: 'ヒアルロン酸注入',
      slug: 'hyaluronic-acid',
      shortDescription: 'ほうれい線やマリオネットラインなどを目立たなくし、自然な若々しさを取り戻します。',
      description: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'ヒアルロン酸注入は、年齢とともに失われるボリュームを補い、お顔の輪郭を整えます。特にほうれい線、マリオネットライン、ゴルゴライン、唇のボリュームアップなどに効果的です。' }]
          }
        ]
      },
      effects: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '施術直後から効果を実感できます。効果の持続期間は使用するヒアルロン酸の種類や注入部位により異なりますが、通常6ヶ月〜1年程度です。' }]
          }
        ]
      },
      risks: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '注入部位の赤み、腫れ、内出血などが見られることがあります。通常は数日で落ち着きます。まれに、アレルギー反応や血管閉塞などの重篤な副作用が生じる可能性があります。' }]
          }
        ]
      },
      thumbnail: {
        data: {
          id: 6,
          attributes: {
            name: 'ha-thumb.jpg',
            alternativeText: 'ヒアルロン酸注入',
            caption: '',
            width: 400,
            height: 300,
            formats: {
              thumbnail: { url: '/placeholder-treatment2.jpg', width: 100, height: 75 },
              small: { url: '/placeholder-treatment2.jpg', width: 200, height: 150 },
              medium: { url: '/placeholder-treatment2.jpg', width: 300, height: 225 },
              large: { url: '/placeholder-treatment2.jpg', width: 400, height: 300 }
            },
            url: '/placeholder-treatment2.jpg'
          }
        }
      },
      featuredImage: {
        data: {
          id: 7,
          attributes: {
            name: 'ha-featured.jpg',
            alternativeText: 'ヒアルロン酸注入施術',
            caption: '',
            width: 800,
            height: 600,
            formats: {
              thumbnail: { url: '/placeholder-treatment2-large.jpg', width: 200, height: 150 },
              small: { url: '/placeholder-treatment2-large.jpg', width: 400, height: 300 },
              medium: { url: '/placeholder-treatment2-large.jpg', width: 600, height: 450 },
              large: { url: '/placeholder-treatment2-large.jpg', width: 800, height: 600 }
            },
            url: '/placeholder-treatment2-large.jpg'
          }
        }
      },
      prices: [
        { id: 3, title: '1cc', amount: 40000, unit: '円（税込）' },
        { id: 4, title: '2cc', amount: 70000, unit: '円（税込）' }
      ],
      category: {
        data: {
          id: 1,
          attributes: {
            name: '注入治療',
            slug: 'injection',
            description: '注射による施術メニュー',
            icon: 'injection',
            order: 1,
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z'
          }
        }
      },
      isPopular: true,
      order: 2,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z'
    }
  }
];

const demoNotices = [
  {
    id: 1,
    attributes: {
      title: '年末年始の休診のお知らせ',
      content: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '12月29日から1月3日まで休診とさせていただきます。ご不便をおかけしますが、よろしくお願いいたします。' }]
          }
        ]
      },
      publishDate: '2023-12-01T00:00:00.000Z',
      category: 'お知らせ',
      isImportant: true,
      createdAt: '2023-12-01T00:00:00.000Z',
      updatedAt: '2023-12-01T00:00:00.000Z',
      publishedAt: '2023-12-01T00:00:00.000Z'
    }
  }
];

const demoCampaigns = [
  {
    id: 1,
    attributes: {
      title: '夏のスペシャルキャンペーン',
      description: {
        type: 'document',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '夏に向けてお肌の準備を始めましょう！今だけヒアルロン酸注入が通常価格より20%オフでご提供します。' }]
          }
        ]
      },
      image: {
        data: {
          id: 8,
          attributes: {
            name: 'campaign.jpg',
            alternativeText: '夏のキャンペーン',
            caption: '',
            width: 600,
            height: 400,
            formats: {
              thumbnail: { url: '/placeholder-campaign.jpg', width: 150, height: 100 },
              small: { url: '/placeholder-campaign.jpg', width: 300, height: 200 },
              medium: { url: '/placeholder-campaign.jpg', width: 450, height: 300 },
              large: { url: '/placeholder-campaign.jpg', width: 600, height: 400 }
            },
            url: '/placeholder-campaign.jpg'
          }
        }
      },
      startDate: '2023-06-01T00:00:00.000Z',
      endDate: '2023-08-31T00:00:00.000Z',
      regularPrice: 40000,
      campaignPrice: 32000,
      relatedTreatments: {
        data: [
          {
            id: 2,
            attributes: {
              title: 'ヒアルロン酸注入',
              slug: 'hyaluronic-acid',
              // 他の属性は省略
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z',
              publishedAt: '2023-01-01T00:00:00.000Z'
            }
          }
        ]
      },
      isActive: true,
      createdAt: '2023-05-15T00:00:00.000Z',
      updatedAt: '2023-05-15T00:00:00.000Z',
      publishedAt: '2023-05-15T00:00:00.000Z'
    }
  }
];

// Strapiの基本的なレスポンス型
export type StrapiResponse<T> = {
  data: {
    id: number;
    attributes: T & {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: {
    id: number;
    attributes: T & {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  meta: {};
};

// リッチテキスト用の型
export type StrapiRichText = {
  type: string;
  children: {
    type: string;
    text?: string;
    children?: any[];
    format?: any;
  }[];
};

// 画像用の型
export type StrapiImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          url: string;
          width: number;
          height: number;
        };
        small: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        large: {
          url: string;
          width: number;
          height: number;
        };
      };
      url: string;
    };
  };
};

// コンテンツタイプの型定義
export type ClinicInfo = {
  clinicName: string;
  shortDescription: string;
  fullDescription: StrapiRichText;
  address: string;
  phoneNumber: string;
  logo: StrapiImage;
  heroImage: StrapiImage;
  openingHours: {
    id: number;
    day: string;
    hours: string;
  }[];
};

export type Doctor = {
  name: string;
  title: string;
  specialty: string;
  profile: StrapiRichText;
  message: StrapiRichText;
  photo: StrapiImage;
  order: number;
};

export type TreatmentCategory = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
};

export type Treatment = {
  title: string;
  slug: string;
  shortDescription: string;
  description: StrapiRichText;
  effects: StrapiRichText;
  risks: StrapiRichText;
  thumbnail: StrapiImage;
  featuredImage: StrapiImage;
  prices: {
    id: number;
    title: string;
    amount: number;
    unit: string;
  }[];
  category: {
    data: {
      id: number;
      attributes: TreatmentCategory;
    };
  };
  isPopular: boolean;
  order: number;
};

export type CaseStudy = {
  title: string;
  slug: string;
  treatment: {
    data: {
      id: number;
      attributes: Treatment;
    };
  };
  beforeImage: StrapiImage;
  afterImage: StrapiImage;
  patientAge: string;
  patientGender: string;
  description: StrapiRichText;
  patientComment: string;
  publishDate: string;
};

export type FAQ = {
  question: string;
  answer: StrapiRichText;
  category: string;
  relatedTreatments: {
    data: {
      id: number;
      attributes: Treatment;
    }[];
  };
  order: number;
};

export type BlogPost = {
  title: string;
  slug: string;
  summary: string;
  content: StrapiRichText;
  featuredImage: StrapiImage;
  author: {
    data: {
      id: number;
      attributes: Doctor;
    };
  };
  publishDate: string;
  tags: string[];
  relatedPosts: {
    data: {
      id: number;
      attributes: BlogPost;
    }[];
  };
  relatedTreatments: {
    data: {
      id: number;
      attributes: Treatment;
    }[];
  };
};

export type Campaign = {
  title: string;
  description: StrapiRichText;
  image: StrapiImage;
  startDate: string;
  endDate: string;
  regularPrice: number;
  campaignPrice: number;
  relatedTreatments: {
    data: {
      id: number;
      attributes: Treatment;
    }[];
  };
  isActive: boolean;
};

export type Notice = {
  title: string;
  content: StrapiRichText;
  publishDate: string;
  category: string;
  isImportant: boolean;
};

export type Recruitment = {
  position: string;
  jobDescription: StrapiRichText;
  requirements: StrapiRichText;
  workingHours: string;
  salary: string;
  benefits: StrapiRichText;
  applicationProcess: StrapiRichText;
  isActive: boolean;
};

// リソースマネージャー
const clinicInfoManager = client.single('clinic-info');
const doctorsManager = client.collection('doctors');
const treatmentCategoriesManager = client.collection('treatment-categories');
const treatmentsManager = client.collection('treatments');
const caseStudiesManager = client.collection('case-studies');
const faqsManager = client.collection('faqs');
const blogPostsManager = client.collection('blog-posts');
const campaignsManager = client.collection('campaigns');
const noticesManager = client.collection('notices');
const recruitmentManager = client.collection('recruitments');

// 各コンテンツタイプのデータ取得関数
export async function getClinicInfo() {
  if (isDemo) {
    console.log('Using demo clinic info data');
    return demoClinicInfo;
  }

  try {
    const response = await clinicInfoManager.find({
      populate: 'deep',
    });
    return (response.data as unknown) as StrapiSingleResponse<ClinicInfo>['data'] | null;
  } catch (error) {
    console.error('Error fetching clinic info:', error);
    return demoClinicInfo;
  }
}

export async function getDoctors(order: boolean = true) {
  if (isDemo) {
    console.log('Using demo doctors data');
    return demoDoctors;
  }

  try {
    const params: any = {
      populate: 'photo',
    };
    
    if (order) {
      params.sort = 'order:asc';
    }
    
    const response = await doctorsManager.find(params);
    return (response.data as unknown) as StrapiResponse<Doctor>['data'];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return demoDoctors;
  }
}

export async function getTreatments(params: Record<string, any> = {}) {
  if (isDemo) {
    console.log('Using demo treatments data');
    return demoTreatments;
  }

  try {
    const defaultParams = {
      populate: ['thumbnail', 'featuredImage', 'category'],
      sort: 'order:asc',
      ...params,
    };
    
    const response = await treatmentsManager.find(defaultParams);
    return (response.data as unknown) as StrapiResponse<Treatment>['data'];
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return demoTreatments;
  }
}

export async function getPopularTreatments() {
  if (isDemo) {
    console.log('Using demo popular treatments data');
    return demoTreatments.filter(t => t.attributes.isPopular);
  }

  try {
    const response = await treatmentsManager.find({
      filters: {
        isPopular: {
          $eq: true,
        },
      },
      populate: ['thumbnail', 'category'],
    });
    return (response.data as unknown) as StrapiResponse<Treatment>['data'];
  } catch (error) {
    console.error('Error fetching popular treatments:', error);
    return demoTreatments.filter(t => t.attributes.isPopular);
  }
}

export async function getTreatmentCategories(order: boolean = true) {
  try {
    const params: any = {
      populate: '*',
    };
    
    if (order) {
      params.sort = 'order:asc';
    }
    
    const response = await treatmentCategoriesManager.find(params);
    return (response.data as unknown) as StrapiResponse<TreatmentCategory>['data'];
  } catch (error) {
    console.error('Error fetching treatment categories:', error);
    return [];
  }
}

export async function getTreatmentsByCategory(categoryId: number) {
  try {
    const response = await treatmentsManager.find({
      filters: {
        category: {
          id: {
            $eq: categoryId,
          },
        },
      },
      populate: ['thumbnail', 'category'],
    });
    return (response.data as unknown) as StrapiResponse<Treatment>['data'];
  } catch (error) {
    console.error(`Error fetching treatments for category ${categoryId}:`, error);
    return [];
  }
}

export async function getTreatmentBySlug(slug: string) {
  try {
    const response = await treatmentsManager.find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: 'deep',
    });
    
    const treatments = (response.data as unknown) as StrapiResponse<Treatment>['data'];
    return treatments.length > 0 ? treatments[0] : null;
  } catch (error) {
    console.error(`Error fetching treatment with slug ${slug}:`, error);
    return null;
  }
}

export async function getCaseStudies(params: Record<string, any> = {}) {
  try {
    const defaultParams = {
      populate: ['beforeImage', 'afterImage', 'treatment'],
      sort: 'publishDate:desc',
      ...params,
    };
    
    const response = await caseStudiesManager.find(defaultParams);
    return (response.data as unknown) as StrapiResponse<CaseStudy>['data'];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function getCaseStudiesByTreatment(treatmentId: number) {
  try {
    const response = await caseStudiesManager.find({
      filters: {
        treatment: {
          id: {
            $eq: treatmentId,
          },
        },
      },
      populate: ['beforeImage', 'afterImage'],
    });
    return (response.data as unknown) as StrapiResponse<CaseStudy>['data'];
  } catch (error) {
    console.error(`Error fetching case studies for treatment ${treatmentId}:`, error);
    return [];
  }
}

export async function getFaqs(params: Record<string, any> = {}) {
  try {
    const defaultParams = {
      populate: 'relatedTreatments',
      sort: 'order:asc',
      ...params,
    };
    
    const response = await faqsManager.find(defaultParams);
    return (response.data as unknown) as StrapiResponse<FAQ>['data'];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function getBlogPosts(params: Record<string, any> = {}) {
  try {
    const defaultParams = {
      populate: ['featuredImage', 'author', 'relatedPosts', 'relatedTreatments'],
      sort: 'publishDate:desc',
      ...params,
    };
    
    const response = await blogPostsManager.find(defaultParams);
    return (response.data as unknown) as StrapiResponse<BlogPost>['data'];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getActiveCampaigns() {
  if (isDemo) {
    console.log('Using demo campaigns data');
    return demoCampaigns;
  }

  try {
    const response = await campaignsManager.find({
      filters: {
        isActive: {
          $eq: true,
        },
      },
      populate: ['image', 'relatedTreatments'],
    });
    return (response.data as unknown) as StrapiResponse<Campaign>['data'];
  } catch (error) {
    console.error('Error fetching active campaigns:', error);
    return demoCampaigns;
  }
}

export async function getNotices(limit: number = 5) {
  if (isDemo) {
    console.log('Using demo notices data');
    return demoNotices;
  }

  try {
    const response = await noticesManager.find({
      populate: 'deep',
      sort: 'publishDate:desc',
      pagination: {
        page: 1,
        pageSize: limit,
      },
    });
    return (response.data as unknown) as StrapiResponse<Notice>['data'];
  } catch (error) {
    console.error('Error fetching notices:', error);
    return demoNotices;
  }
}

export async function getActiveRecruitments() {
  try {
    const response = await recruitmentManager.find({
      filters: {
        isActive: {
          $eq: true,
        },
      },
      populate: 'deep',
    });
    return (response.data as unknown) as StrapiResponse<Recruitment>['data'];
  } catch (error) {
    console.error('Error fetching active recruitments:', error);
    return [];
  }
} 