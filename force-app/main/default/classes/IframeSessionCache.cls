public class IframeSessionCache {

    /* both methods assume there is a default cache partition set */
    @AuraEnabled
    public static void setIframeUrl(String url) {
        try {
            Cache.Session.put('iframeUrl', url);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static String getIframeUrl() {
        try {
            return (String)Cache.Session.get('iframeUrl');
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        
    }
}