<script type="text/javascript" charset="UTF-8" >

    document.onclick = function(event) {
    	var tagName = event.target.tagName;
    	if (tagName == "EMBEDDEDSERVICE-CHAT-HEADER") {
    		var counter = document.getElementsByClassName("dot")[0];
    		if (counter) {
    			counter.style.visibility = "hidden";
    			document.title = title;
    		}
    	}
    }

    document.addEventListener(
		"setCounter",
		function(event) {
			var counter = document.getElementsByClassName("dot")[0];
			if (counter) {
				counter.style.visibility = "visible";
			}
		},
		false
    );

    document.addEventListener(
    	"setCustomField",
    	function(event) {
    		var detail = event.detail;
    		embedded_svc.settings.extraPrechatFormDetails[0].value = event.detail.name;
    		embedded_svc.settings.extraPrechatFormDetails[1].value = event.detail.email;
    		embedded_svc.settings.extraPrechatFormDetails[2].value = event.detail.phone;
    		// Fire startChat callback.
    		event.detail.callback();
    	},
    	false
    );

    var title = document.title;
	var accountId = '{{userID}}'; //Google Tag Manager variable
    var language = document.querySelector('html').getAttribute('lang');
	
	var initESW = function(gslbBaseURL) {
    embedded_svc.settings.avatarImgURL = 'https://parimatch.my.salesforce.com/sfc/dist/version/download/?oid=00D2p00000139LC&ids=0682p00000IBVx0AAH&d=/a/2p0000002WZk/yvHSdKsnO5Oleeq8kNuO.gtRUyuu8P0dmdZoe1aGxcA&operationContext=DELIVERY&viewId=05H2p0000024IzSEAU&dpt=';
    embedded_svc.settings.chatbotAvatarImgURL = 'https://parimatch.my.salesforce.com/sfc/dist/version/download/?oid=00D2p00000139LC&ids=0682p00000IBVx0AAH&d=/a/2p0000002WZk/yvHSdKsnO5Oleeq8kNuO.gtRUyuu8P0dmdZoe1aGxcA&operationContext=DELIVERY&viewId=05H2p0000024IzSEAU&dpt=';
    embedded_svc.settings.displayHelpButton = true;
    embedded_svc.settings.language = language;

    embedded_svc.settings.defaultMinimizedText = (language == 'ru') ? 'ЧАТ ПОДДЕРЖКИ' : 'SUPPORT CHAT';
    embedded_svc.settings.disabledMinimizedText = (language == 'ru') ? 'ЧАТ ПОДДЕРЖКИ' : 'SUPPORT CHAT';
    embedded_svc.settings.loadingText = (language == 'ru') ? 'Загрузка...' : 'Loading...';

    embedded_svc.settings.extraPrechatFormDetails = (accountId) ?
    [
        {"label":"PreChat Form AccountID", "transcriptFields": ["PreChat_Form_AccountID__c"], "value" : accountId},
        {"label":"Start Url", "transcriptFields": ["Prechat_StartUrl__c"], "value": window.location.href,"displayToAgent":false},
        {"label":"Is Logged", "transcriptFields": ["Is_Logged__c"], "value" : "true"}
    ] :

    [
        {"label":"Name",  "transcriptFields": ["PreChat_Form_Name__c"]},
        {"label":"Email", "transcriptFields": ["PreChat_Form_Email__c"]},
        {"label":"Phone", "transcriptFields": ["PreChat_Form_Phone__c"]},
        {"label":"Start Url", "transcriptFields": ["Prechat_StartUrl__c"], "value": window.location.href,"displayToAgent":false}
    ];

	embedded_svc.settings.extraPrechatInfo = [{"entityFieldMaps":[{"doCreate":false,"doFind":false,"fieldName":"LastName","isExactMatch":true,"label":"Last Name"}],"entityName":"Contact","showOnCreate":true}];

    embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    embedded_svc.settings.entryFeature = 'LiveAgent';

 	embedded_svc.init(
        'https://parimatch.my.salesforce.com',
        'https://parimatchchat.secure.force.com/surveychat',
            gslbBaseURL,
            '00D2p00000139LC',
            (accountId) ? 'Chat_Deployment_LoginUser_New' : 'Chat_Deployment_Desktop_New',
            {
                baseLiveAgentContentURL: 'https://c.la1-c2-cdg.salesforceliveagent.com/content',
                deploymentId: '5722p0000000G2t',
                buttonId: (language == 'ru') ? '5732p0000000GqZ' : '5732p0000000GqU',
                baseLiveAgentURL: 'https://d.la1-c2-cdg.salesforceliveagent.com/chat',
                eswLiveAgentDevName: (accountId) ? 'EmbeddedServiceLiveAgent_Parent04I2p0000008PviEAE_177ee7ddf7d' :
                'EmbeddedServiceLiveAgent_Parent04I2p0000008PvdEAE_177ee4a5348',
                isOfflineSupportEnabled: false
            }
    );
};

if (!window.embedded_svc) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://parimatch.my.salesforce.com/embeddedservice/5.0/esw.min.js');
    s.onload = function() {
        initESW(null);
    };
    document.body.appendChild(s);
} else {
    initESW('https://service.force.com');
}

</script>