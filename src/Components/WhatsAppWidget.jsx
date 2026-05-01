import { useEffect } from "react";

const WhatsAppWidget = () => {
    useEffect(() => {
        const url = "https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?68064";

        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = url;

        const options = {
            enabled: true,
            chatButtonSetting: {
                backgroundColor: "#25d366",
                ctaText: "",
                borderRadius: "25",
                marginLeft: "0",
                marginBottom: "20",
                marginRight: "50",
                position: "left",
            },
            brandSetting: {
                brandName: "SANTOSH PAL",
                brandSubTitle: "",
                brandImg:"https://avatars3.githubusercontent.com/u/58684635?s=460",
                welcomeText: "Hi, I am Santosh Pal",
                messageText:"Thank you for contacting Santosh Pal! How can we help you?",
                backgroundColor: "#25d366",
                ctaText: "Start Chat",
                borderRadius: "25",
                autoShow: false,
                phoneNumber: "+918839102688",
            },
        };

        s.onload = () => {
            if (window.CreateWhatsappChatWidget) {
                window.CreateWhatsappChatWidget(options);
            }
        };

        document.body.appendChild(s);

        return () => {
            document.body.removeChild(s); // cleanup
        };
    }, []);

    return null;
};

export default WhatsAppWidget;