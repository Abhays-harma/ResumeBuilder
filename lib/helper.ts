import html2canvas from "html2canvas"

export const generateThumbnail=async ()=>{
    const resumeElement=document.getElementById('resume-preview-id') as HTMLElement;
    if(!resumeElement){
        console.error('Resume preview element not found')
        return;
    }

    try {
        const canvas=await html2canvas(resumeElement,{scale:0.5});
        const thumbnailImage=canvas.toDataURL("image/png")
        return thumbnailImage
    } catch (error) {
        console.error("Thumbnail generation failed",error)
    }
}