import React from 'react';
import { ExternalLink } from 'lucide-react';

export interface GalleryItem {
  image?: string;
  alt: string;
  title: string;
  region: string;
  services: string[];
  fee: string;
  access: string;
  buttonText: string;
  buttonLink: string;
  onClick?: () => void;
}

export interface CardStyles {
  container?: string;
  image?: string;
  textContainer?: string;
  header?: string;

  title?: string;
  region?: string;

  detailLine?: string;
  label?: string;
  value?: string;

  services?: string;

  fee?: string;
  free?: string;

  access?: string;

  button?: string;
  buttonIcon?: string;

  highlight?: string;
}

export interface LayoutConfig {
  type: string;
  columns: {
    default: number;
    sm: number;
    md: number;
    xl: number;
  };
  gap: number;
  padding: string;
}

export interface UCCStateTileGalleryProps {
  items: GalleryItem[];
  cardStyles: CardStyles;
  layout: LayoutConfig;
}

const UCCStateTileGallery: React.FC<UCCStateTileGalleryProps> = ({ items, cardStyles, layout }) => {
  // NOTE: Tailwind won’t generate dynamic class names like `grid-cols-${n}` unless you safelist them.
  // Safer approach: map numbers to classes.
  const cols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  } as const;

  const gaps = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  } as const;

  const gridClasses = [
    'grid',
    cols[(layout.columns.default as keyof typeof cols) || 1] || 'grid-cols-1',
    `sm:${cols[(layout.columns.sm as keyof typeof cols) || 2] || 'grid-cols-2'}`,
    `md:${cols[(layout.columns.md as keyof typeof cols) || 3] || 'grid-cols-3'}`,
    `xl:${cols[(layout.columns.xl as keyof typeof cols) || 4] || 'grid-cols-4'}`,
    gaps[(layout.gap as keyof typeof gaps) || 8] || 'gap-8',
    layout.padding || '',
  ].join(' ');

  return (
    <div className={gridClasses}>
      {items.map((item, index) => {
        const CardTag: any = item.onClick ? 'button' : 'div';

        return (
          <CardTag
            key={index}
            type={item.onClick ? 'button' : undefined}
            onClick={item.onClick}
            className={[
              item.onClick ? 'text-left' : '',
              cardStyles.container || 'gallery-card-container',
              cardStyles.highlight || '',
            ].join(' ')}
          >
            {/* Optional image */}
            <div className={cardStyles.image || 'hidden'}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
                        <rect width="200" height="150" fill="#f3f4f6"/>
                        <text x="100" y="75" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">
                          ${item.title}
                        </text>
                      </svg>
                    `)}`;
                  }}
                />
              ) : null}
            </div>

            {/* Content */}
            <div className={cardStyles.textContainer || 'gallery-card-text-container'}>
              <div className={cardStyles.header || 'gallery-card-header'}>
                <h3 className={cardStyles.title || 'gallery-card-title'}>{item.title}</h3>
                <p className={cardStyles.region || 'gallery-card-region'}>{item.region}</p>
              </div>

              <div className={cardStyles.detailLine || 'gallery-card-detail-line'}>
                <span className={cardStyles.label || 'gallery-card-label'}>Services:</span>
                <span className={cardStyles.services || 'gallery-card-services'}>
                  {item.services.join(', ')}
                </span>
              </div>

              <div className={cardStyles.detailLine || 'gallery-card-detail-line'}>
                <span className={cardStyles.label || 'gallery-card-label'}>Fee:</span>
                <span
                  className={
                    item.fee.toLowerCase().includes('free')
                      ? (cardStyles.free || 'gallery-card-free')
                      : (cardStyles.fee || 'gallery-card-fee')
                  }
                >
                  {item.fee}
                </span>
              </div>

              <div className={cardStyles.detailLine || 'gallery-card-detail-line'}>
                <span className={cardStyles.label || 'gallery-card-label'}>Access:</span>
                <span className={cardStyles.access || 'gallery-card-access'}>
                  {item.access}
                </span>
              </div>
            </div>

            {/* Action button (kept as an anchor for the official site) */}
            <div className="p-4 pt-0">
              <a
                href={item.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${item.title} UCC Site (opens in new tab)`}
                className={cardStyles.button || 'gallery-card-button'}
              >
                <span>{item.buttonText}</span>
                <ExternalLink className={cardStyles.buttonIcon || 'w-4 h-4'} />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </CardTag>
        );
      })}
    </div>
  );
};

export default UCCStateTileGallery;