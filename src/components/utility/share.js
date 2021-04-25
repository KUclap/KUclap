export const shareReview = (type, reviewId, classId, classNameTH, setIsCopied) => {
    const href = `https://kuclap.com/review/${reviewId}`;
    let url;
    switch (type) {
        case "facebook": {
            const appId = "784451072347559";
            url = `https://fb.com/dialog/share?app_id=${appId}&href=${href}&display=page`;
            window.open(url);
            break;
        }
        case "twitter": {
            const tweetText = `รีวิววิชา ${classNameTH} (${classId}) #KUclap ${href}`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                tweetText
            )}`;
            window.open(url);
            break;
        }
        case "line": {
            const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                href
            )}`;
            window.open(url);
            break;
        }
        default: {
            const tmpTextArea = document.createElement("textarea");
            tmpTextArea.value = href;
            document.body.appendChild(tmpTextArea);
            tmpTextArea.select();
            document.execCommand("copy");
            document.body.removeChild(tmpTextArea);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    }
}