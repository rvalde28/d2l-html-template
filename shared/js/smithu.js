(function () {
	if (!window.top.SmithD2L) {
		window.top.SmithD2L = {
			dialog: null,
			dialogWrapperClass: 'smith-dialog-wrapper',
			bodyDialogToggleClass: 'show-dialog',
			email: null,
			dialogContentObj: null,
			init() {
				this.AddSmithUCss();
				this.setDialog();
				if (!this.dialog) {
					let dialogWrapper = this.createDialogElement();
					window.top.document.body.appendChild(dialogWrapper);
					this.setDialog();
					this.dialog.querySelector('button.request-enroll-button').addEventListener('click', this.requestEnrollment);
					this.dialog.querySelector('button.close-button').addEventListener('click', this.hideDialog);
					this.dialog.addEventListener('click', this.hideDialog);
					this.dialog.querySelector('.smith-dialog').addEventListener('click', e => e.stopPropagation());
				}
			},
			createDialogElement() {
				let dialogRaw = `
				    <div class="smith-dialog">
				      <div class="smith-dialog-header">
				      </div>
				      <div class="smith-dialog-body">
				      	<span class="notice"></span>
				      	<p></p>
				      </div>
				      <div class="smith-dialog-footer">
				      	<button type="button" class="request-enroll-button">Request Enroll</button>
				        <button type="button" class="close-button">Close</button>
				      </div>
				    </div>
				`;
				let dialogWrapper = document.createElement('div');
				dialogWrapper.classList.add(this.dialogWrapperClass);
				dialogWrapper.innerHTML = dialogRaw;
				return dialogWrapper;
			},
			setDialogHeader(title) {
				this.dialog.querySelector('.smith-dialog-header').innerHTML = `<span>${title}</span>`;
			},
			setDialogNotice(notice) {
				this.dialog.querySelector('.smith-dialog-body .notice').innerHTML = notice;
			},
			setDialogBody(body) {
				this.dialog.querySelector('.smith-dialog-body p').innerHTML = body;
			},
			showDialog(obj) {
			this.dialogContentObj = obj;
			this.setDialogHeader(obj.title);
				this.setDialogBody(obj.body);
				if (!obj.hideEnrollButton) {
					this.dialog.classList.add('with-enrollment-request');
				}
				if (obj.requestStatus) {
					this.setDialogNotice(`Enrollment Request Status: ${obj.requestStatus}`);
				}

				window.top.document.body.classList.add(this.bodyDialogToggleClass);

			},
			requestEnrollment(e) {
				if (e.currentTarget.classList.contains('request-enroll-button')) {
					if (window.top.Smith && window.top.Smith.requestEnrollment) {
						window.top.Smith.requestEnrollment(
							window.top.SmithD2L.dialogContentObj.courseId,
							{
								smith_user_id: window.top.SmithD2L.dialogContentObj.requester,
								properties: {
									status: 'Requested'
								}
							},
							(res) => {
								alert(res.message || 'Course enrollment request sent.')
							},
							() => {
								alert('Failed to send enrollment request.')
							}
						);
					}
				}
			},
			hideDialog() {
				window.top.SmithD2L.email = null;
				window.top.SmithD2L.dialog.classList.remove('with-enrollment-request');
				window.top.SmithD2L.setDialogNotice('');
				window.top.document.body.classList.remove('show-dialog');
				window.top.SmithD2L.setDialogBody('<p></p>');
			},
			setDialog() {
				this.dialog = window.top.document.body.querySelector(`.${this.dialogWrapperClass}`);
			},

			AddSmithUCss() {
				let link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('href', '/shared/css/smithu.css');
				window.top.document.head.appendChild(link);

				let main = document.createElement('link');
                main.setAttribute('rel', 'stylesheet');
                main.setAttribute('href', 'css/main.css');
                window.top.document.head.appendChild(main);
			}
		};

		if (!window.top.SmithD2L.dialog) {
			window.top.SmithD2L.init();
			if (!window.top.Smith) {
				let script = document.createElement('script');
				// script.setAttribute('src', `${window.top.location.origin}/shared/third_party/smithdev.min.js`);
				script.setAttribute('src', `${window.top.location.origin}/shared/third_party/smithdev.js`);
				window.top.document.body.appendChild(script);
			}
		}
	}
})();