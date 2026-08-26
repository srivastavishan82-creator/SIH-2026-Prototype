import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 26, once = true, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, gap = 0.09, className, style }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, y = 24, style }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, decimals = 0, suffix = '', prefix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function GrowBar({ height, delay = 0, color }) {
  return (
    <motion.div
      className="bar-fill"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ height, background: color }}
    />
  );
}

export function DrawLine({ vertical = false, delay = 0 }) {
  return (
    <motion.div
      className="pipe-line"
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: 'easeInOut' }}
    />
  );
}
