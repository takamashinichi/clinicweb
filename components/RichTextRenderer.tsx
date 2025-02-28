import React from 'react';
import Link from 'next/link';
import { StrapiRichText, StrapiImage } from '@/lib/strapi';
import ReactMarkdown from 'react-markdown';

type RichTextRendererProps = {
  content: StrapiRichText;
  className?: string;
  images?: Record<string, StrapiImage>;
};

// Strapiのリッチテキストをレンダリングするコンポーネント
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '', images }) => {
  if (!content) return null;
  
  // Strapiのリッチテキストをマークダウンに変換
  // 注: Strapiのリッチテキストフォーマットによって実装が異なる場合があります
  const renderRichText = () => {
    // Strapiのリッチテキストコンテンツがマークダウン形式の場合
    if (content.type === 'markdown') {
      return (
        <ReactMarkdown className={`rich-text ${className}`}>
          {content.children.map(child => child.text || '').join('')}
        </ReactMarkdown>
      );
    }
    
    // Strapiのリッチテキストコンテンツが通常のリッチテキスト形式の場合
    return (
      <div className={`rich-text ${className}`}>
        {content.children.map((block, blockIndex) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={blockIndex} className="mb-4 last:mb-0">
                  {block.children?.map((child, childIndex) => {
                    if (child.text) {
                      let element = child.text;
                      
                      // スタイルの適用
                      if (child.format) {
                        if (child.format.bold) {
                          element = <strong key={childIndex} className="font-bold">{element}</strong>;
                        }
                        if (child.format.italic) {
                          element = <em key={childIndex} className="italic">{element}</em>;
                        }
                        if (child.format.underline) {
                          element = <u key={childIndex} className="underline">{element}</u>;
                        }
                        if (child.format.code) {
                          element = <code key={childIndex} className="bg-gray-100 text-blue-800 p-1 rounded font-mono text-sm">{element}</code>;
                        }
                      }
                      
                      return element;
                    }
                    
                    // リンクの場合
                    if (child.type === 'link') {
                      const isInternal = child.url?.startsWith('/') || child.url?.includes('localhost');
                      
                      if (isInternal) {
                        return (
                          <Link key={childIndex} href={child.url || '#'}>
                            <span className="text-blue-600 hover:text-blue-800 hover:underline">
                              {child.children?.map(linkChild => linkChild.text).join('') || ''}
                            </span>
                          </Link>
                        );
                      }
                      
                      return (
                        <a 
                          key={childIndex}
                          href={child.url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {child.children?.map(linkChild => linkChild.text).join('') || ''}
                        </a>
                      );
                    }
                    
                    // 画像の場合
                    if (child.type === 'image' && images && child.imageId) {
                      const image = images[child.imageId];
                      if (image) {
                        return (
                          <div key={childIndex} className="my-4">
                            <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || ''}${image.data.attributes.url}`}
                              alt={image.data.attributes.alternativeText || ''}
                              className="max-w-full h-auto rounded"
                            />
                            {image.data.attributes.caption && (
                              <p className="text-sm text-gray-600 mt-1">{image.data.attributes.caption}</p>
                            )}
                          </div>
                        );
                      }
                    }
                    
                    return null;
                  })}
                </p>
              );
              
            case 'heading':
              const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
              const headingClasses = {
                h1: "text-3xl font-bold mb-4 text-blue-700",
                h2: "text-2xl font-bold mb-3 text-blue-700",
                h3: "text-xl font-bold mb-2 text-blue-700",
                h4: "text-lg font-bold mb-2 text-blue-700",
                h5: "text-base font-bold mb-2 text-blue-700",
                h6: "text-sm font-bold mb-2 text-blue-700",
              }[HeadingTag] || "";
              
              return (
                <HeadingTag key={blockIndex} className={headingClasses}>
                  {block.children?.map(child => child.text).join('')}
                </HeadingTag>
              );
              
            case 'list':
              const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
              const listClasses = ListTag === 'ul' 
                ? "list-disc pl-5 mb-4" 
                : "list-decimal pl-5 mb-4";
              
              return (
                <ListTag key={blockIndex} className={listClasses}>
                  {block.children?.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-1">
                      {item.children?.map(child => child.text).join('')}
                    </li>
                  ))}
                </ListTag>
              );
              
            case 'quote':
              return (
                <blockquote key={blockIndex} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 text-gray-700 italic">
                  {block.children?.map(child => child.text).join('')}
                </blockquote>
              );
              
            case 'code':
              return (
                <pre key={blockIndex} className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                  <code className="text-blue-800 font-mono text-sm">
                    {block.children?.map(child => child.text).join('')}
                  </code>
                </pre>
              );
              
            case 'image':
              if (images && block.imageId) {
                const image = images[block.imageId];
                if (image) {
                  return (
                    <div key={blockIndex} className="my-4">
                      <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || ''}${image.data.attributes.url}`}
                        alt={image.data.attributes.alternativeText || ''}
                        className="max-w-full h-auto rounded"
                      />
                      {image.data.attributes.caption && (
                        <p className="text-sm text-gray-600 mt-1">{image.data.attributes.caption}</p>
                      )}
                    </div>
                  );
                }
              }
              return null;
              
            default:
              return null;
          }
        })}
      </div>
    );
  };
  
  return renderRichText();
};

export default RichTextRenderer; 