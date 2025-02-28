import { Document } from "@contentful/rich-text-types";

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

// コンテンツタイプごとの型定義
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

// API基本URL
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Strapiからデータを取得する基本関数
async function fetchAPI(endpoint: string, params: Record<string, any> = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const queryString = Object.keys(params).length
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';

  const response = await fetch(`${API_URL}/api/${endpoint}${queryString}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return await response.json();
}

// 各コンテンツタイプのデータ取得関数
export async function getClinicInfo() {
  try {
    const response = await fetchAPI('clinic-info', {
      populate: 'deep',
    });
    return response.data as StrapiSingleResponse<ClinicInfo>['data'] | null;
  } catch (error) {
    console.error('Error fetching clinic info:', error);
    return null;
  }
}

export async function getDoctors(order: boolean = true) {
  try {
    const params: Record<string, any> = {
      populate: '*',
    };
    
    if (order) {
      params.sort = 'order:asc';
    }
    
    const response = await fetchAPI('doctors', params);
    return response.data as StrapiResponse<Doctor>['data'];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

export async function getTreatments(params: Record<string, any> = {}) {
  try {
    const queryParams = {
      populate: 'deep',
      ...params,
    };
    
    const response = await fetchAPI('treatments', queryParams);
    return response.data as StrapiResponse<Treatment>['data'];
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }
}

export async function getPopularTreatments() {
  try {
    const response = await fetchAPI('treatments', {
      populate: 'deep',
      'filters[isPopular][$eq]': true,
      sort: 'order:asc',
    });
    return response.data as StrapiResponse<Treatment>['data'];
  } catch (error) {
    console.error('Error fetching popular treatments:', error);
    return [];
  }
}

export async function getTreatmentCategories(order: boolean = true) {
  try {
    const params: Record<string, any> = {
      populate: '*',
    };
    
    if (order) {
      params.sort = 'order:asc';
    }
    
    const response = await fetchAPI('treatment-categories', params);
    return response.data as StrapiResponse<TreatmentCategory>['data'];
  } catch (error) {
    console.error('Error fetching treatment categories:', error);
    return [];
  }
}

export async function getTreatmentsByCategory(categoryId: number) {
  try {
    const response = await fetchAPI('treatments', {
      populate: 'deep',
      'filters[category][id][$eq]': categoryId,
      sort: 'order:asc',
    });
    return response.data as StrapiResponse<Treatment>['data'];
  } catch (error) {
    console.error('Error fetching treatments by category:', error);
    return [];
  }
}

export async function getTreatmentBySlug(slug: string) {
  try {
    const response = await fetchAPI('treatments', {
      populate: 'deep',
      'filters[slug][$eq]': slug,
    });
    const treatments = response.data as StrapiResponse<Treatment>['data'];
    return treatments.length > 0 ? treatments[0] : null;
  } catch (error) {
    console.error('Error fetching treatment by slug:', error);
    return null;
  }
}

export async function getCaseStudies(params: Record<string, any> = {}) {
  try {
    const queryParams = {
      populate: 'deep',
      sort: 'publishDate:desc',
      ...params,
    };
    
    const response = await fetchAPI('case-studies', queryParams);
    return response.data as StrapiResponse<CaseStudy>['data'];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function getCaseStudiesByTreatment(treatmentId: number) {
  try {
    const response = await fetchAPI('case-studies', {
      populate: 'deep',
      'filters[treatment][id][$eq]': treatmentId,
      sort: 'publishDate:desc',
    });
    return response.data as StrapiResponse<CaseStudy>['data'];
  } catch (error) {
    console.error('Error fetching case studies by treatment:', error);
    return [];
  }
}

export async function getFaqs(params: Record<string, any> = {}) {
  try {
    const queryParams = {
      populate: 'deep',
      sort: 'order:asc',
      ...params,
    };
    
    const response = await fetchAPI('faqs', queryParams);
    return response.data as StrapiResponse<FAQ>['data'];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function getBlogPosts(params: Record<string, any> = {}) {
  try {
    const queryParams = {
      populate: 'deep',
      sort: 'publishDate:desc',
      ...params,
    };
    
    const response = await fetchAPI('blog-posts', queryParams);
    return response.data as StrapiResponse<BlogPost>['data'];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getActiveCampaigns() {
  try {
    const now = new Date().toISOString();
    const response = await fetchAPI('campaigns', {
      populate: 'deep',
      'filters[isActive][$eq]': true,
      'filters[startDate][$lte]': now,
      'filters[endDate][$gte]': now,
    });
    return response.data as StrapiResponse<Campaign>['data'];
  } catch (error) {
    console.error('Error fetching active campaigns:', error);
    return [];
  }
}

export async function getNotices(limit: number = 5) {
  try {
    const response = await fetchAPI('notices', {
      populate: 'deep',
      sort: 'publishDate:desc',
      pagination: {
        page: 1,
        pageSize: limit,
      },
    });
    return response.data as StrapiResponse<Notice>['data'];
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

export async function getActiveRecruitments() {
  try {
    const response = await fetchAPI('recruitments', {
      populate: 'deep',
      'filters[isActive][$eq]': true,
    });
    return response.data as StrapiResponse<Recruitment>['data'];
  } catch (error) {
    console.error('Error fetching active recruitments:', error);
    return [];
  }
} 