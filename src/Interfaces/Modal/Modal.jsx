import style from "./Modal.module.scss"
import { useEffect } from "react"

export const Modal = ({
  visible,
  title,
  content,
  footer,
  onClose,
}) => {
  const onKeydown = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  

  if (!visible) return null
  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modal_dialog} onClick={e => e.stopPropagation()}>
        <div className={style.modal_header}>
          <h3 className={style.modal_title}>{title}</h3>
          <span className={style.modal_close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={style.modal_body}>
          <div className={style.modal_content}>{content}</div>
        </div>
        {footer && <div className={style.modal_footer}>{footer}</div>}
      </div>
    </div>
  )
}