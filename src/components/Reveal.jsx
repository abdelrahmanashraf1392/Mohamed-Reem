import { useInView } from '../hooks/useInView.js';

/**
 * Scroll-triggered reveal wrapper.
 * variant: 'up' (default) | 'fade' | 'mask' (image curtain) | 'line' (text rising from a clip)
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
