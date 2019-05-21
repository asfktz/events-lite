
module.exports = {
	creators: {
		table: 'יוצרים',
		mappings: {
			name: 'שם',
			family: 'משפחה',
			phone: 'נייד',
			email: 'מייל',
			agreed: 'הצהרת משתתף',

			events: 'אירועים',
			camps: 'מחנות'
		}
	},
	events: {
		table: 'אירועים',
		mappings: {
			name: 'שם האירוע',
			digitalDescription: 'תיאור דיגיטל',
			creatorName: 'שמות היוצרים',
			creatorAbout: 'על היוצרים',
			printDescription: 'תיאור דפוס',
			printCreators: 'יוצרים דפוס',
			coverImageOrig: 'תמונה',
			coverImageSM: 'cover_small',
			coverImageLG: 'cover_large',
			isChildrenFriendly: 'מתאים לילדים',
			isRegistrationRequired: 'הרשמה מראש',
			isDeleted: 'נמחק',
			genre: 'ז\'אנר (genre)',
			useManualRegistration: 'use_manual_registration',
			manualRegistrationContent: 'manual_registration_content',
			registrations: 'הרשמות',

			guid: 'GUID_BACKUP',
			creators: 'יוצרים',

			camps: 'מחנות',
			bookings: 'שיבוצים',
		}
	},
	categories: {
		table: 'קטגוריות',
		mappings: {
			name: 'שם האירוע',
			description: 'תיאור דיגיטל',
			creators: 'יוצרים דיגיטל',
			printDescription: 'תיאור דפוס',
			printCreators: 'יוצרים דפוס',
			isChildrenFriendly: 'מתאים לילדים',
			isRegistrationRequired: 'הרשמה מראש',
			isDeleted: 'נמחק',
			genre: 'ז\'אנר (genre)'
		}
	},
	camps: {
		table: 'מחנות',
		mappings: {
			name: 'שם',
			events: 'אירועים',
			owners: 'מנהלי המחנה',
			coverImageSM: 'cover_small',
			coverImageLG: 'cover_large',
			description: 'תיאור',
			zone: 'אזור',
			address: 'כתובת',
			lat: 'lat',
			lng: 'lng'
		}
	},
	locations: {
		table: 'מקומות',
		mappings: {
			type: 'type',
			zone: 'zone',
			lat: 'lat',
			lng: 'lng',
			comments: 'comments',
			name: 'name',
			surname: 'surname',
			address: 'address',
			bookings: 'שיבוצים'
		}
	},
	bookings: {
		table: 'שיבוצים',
		mappings: {
			event: 'אירוע',
			location: 'מקום',
			startTime: 'זמן התחלה',
			duration: 'משך',
			day: 'יום',
			comments: 'הערות',

			locationPrint: 'מקום פרינט',
			startTimePrint: 'זמן התחלה פרינט',
			durationPrint: 'משך פרינט',
			dayPrint: 'יום פרינט',
			isCanceled: 'בוטל'
		}
	},
	registrations: {
		table: 'הרשמות',
		mappings: {
			userId: 'user_id',
			userData: 'user_data',
			eventId: 'event_id',
			isAgreed: 'is_agreed',
			isDeleted: 'is_deleted'
		}
	},
};