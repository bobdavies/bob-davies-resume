document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-resume');
    
    downloadBtn.addEventListener('click', async function() {
        // Create loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        this.disabled = true;

        try {
            // Hide the download button temporarily
            this.style.display = 'none';
            
            // Get the resume container
            const element = document.querySelector('.resume');
            
            // Calculate actual content height
            const totalHeight = Math.max(
                element.scrollHeight,
                element.offsetHeight,
                element.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight
            );
            
            const totalWidth = Math.max(
                element.scrollWidth,
                element.offsetWidth,
                element.clientWidth,
                document.documentElement.scrollWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            );

            // PDF options
            const opt = {
                margin: 0,
                filename: 'bob_davies_resume.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    scrollY: -window.scrollY,
                    height: totalHeight,
                    width: totalWidth,
                    backgroundColor: '#ffffff',
                    onclone: function(clonedDoc) {
                        const clonedElement = clonedDoc.querySelector('.resume');
                        if (clonedElement) {
                            // Force all content to be visible
                            clonedElement.style.width = '100%';
                            clonedElement.style.height = 'auto';
                            clonedElement.style.overflow = 'visible';
                            clonedElement.style.position = 'relative';
                            
                            // Ensure all child elements are visible
                            const allElements = clonedElement.getElementsByTagName('*');
                            for (let el of allElements) {
                                el.style.overflow = 'visible';
                                if (el.style.height === '0px') {
                                    el.style.height = 'auto';
                                }
                            }
                        }
                    }
                },
                jsPDF: {
                    unit: 'px',
                    format: [totalWidth, totalHeight],
                    orientation: 'portrait',
                    compress: true
                }
            };

            // Generate PDF with better error handling
            await html2pdf().set(opt).from(element).save().catch(error => {
                console.error('PDF generation error:', error);
                throw error;
            });

        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            // Restore button state and visibility
            this.style.display = '';
            this.innerHTML = originalText;
            this.disabled = false;
        }
    });
});
