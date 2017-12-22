((nil . ((eval
         . (progn
             (let ((base-path
                    (locate-dominating-file default-directory ".dir-locals.el")))
               (setq-local backup-directory-alist
                           `((,(expand-file-name ".*"
                                                 base-path)
                              . ,(expand-file-name "../.backup"
                                                   base-path))))
               (make-local-variable 'exec-path)
               (add-to-list 'exec-path
                            (expand-file-name "node_modules/.bin/"
                                              base-path)))))
         (create-lockfiles . nil)))
 (typescript-mode . ((typescript-auto-indent-flag . nil)
                     (flycheck-typescript-tslint-config . "config/tslint/common.js")))
 (scss-mode . ((css-indent-offset . 2)))
 (js2-mode . ((js-indent-level . 2)
              (js2-bounce-indent-p . t)
              (js2-strict-trailing-comma-warning . nil)
              (js2-strict-missing-semi-warning . nil)
              (js2-strict-inconsistent-return-warning . nil)
              (js2-additional-externs . (list "require" "describe" "it" "beforeEach" "afterEach" "expect"))))
 (json-mode . ((js-indent-level . 2))))
