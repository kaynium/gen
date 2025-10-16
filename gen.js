
        // --- DOM Elements ---
        const imageUpload = document.getElementById('imageUpload');
        const uploadBox = document.getElementById('uploadBox');
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        const imagePreview = document.getElementById('imagePreview');
        const changeImageBtn = document.getElementById('changeImageBtn');
        const suggestCategoryBtn = document.getElementById('suggestCategoryBtn');

        const generateBtn = document.getElementById('generateBtn');
        const resultsContainer = document.getElementById('resultsContainer');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const errorContainer = document.getElementById('errorContainer');
        const imagesOutput = document.getElementById('imagesOutput');
        const resultsGrid = document.getElementById('resultsGrid');
        const retryBtn = document.getElementById('retryBtn');
        const aboutCreatorBtn = document.getElementById('aboutCreatorBtn');
        const previewModal = document.getElementById('previewModal');
        const previewImage = document.getElementById('previewImage');
        const closePreviewBtn = document.getElementById('closePreviewBtn');
        const savePngBtn = document.getElementById('savePngBtn');
        const logoUpload = document.getElementById('logoUpload');
        const logoUploadBox = document.getElementById('logoUploadBox');
        const logoPreviewContainer = document.getElementById('logoPreviewContainer');
        const logoPreview = document.getElementById('logoPreview');
        const clearLogoBtn = document.getElementById('clearLogoBtn');
        const categoryScrollContainer = document.getElementById('categoryScrollContainer');
        const categoryGrid = document.getElementById('categoryGrid');
        const scrollLeftBtn = document.getElementById('scrollLeftBtn');
        const scrollRightBtn = document.getElementById('scrollRightBtn');
        const resultsTitle = document.getElementById('resultsTitle');
        const modelOptionButtons = document.querySelectorAll('.model-option-btn');
        const captionModal = document.getElementById('captionModal');
        const closeCaptionBtn = document.getElementById('closeCaptionBtn');
        const captionLoading = document.getElementById('captionLoading');
        const captionResult = document.getElementById('captionResult');
        const captionText = document.getElementById('captionText');
        const copyCaptionBtn = document.getElementById('copyCaptionBtn');
        const seoGeneratorSection = document.getElementById('seoGeneratorSection');
        const generateSeoBtn = document.getElementById('generateSeoBtn');
        const seoDisplaySection = document.getElementById('seoDisplaySection');
        const seoTitlesContainer = document.getElementById('seoTitlesContainer');
        const seoDisplayDescription = document.getElementById('seoDisplayDescription');
        const seoKeywordsContainer = document.getElementById('seoKeywordsContainer');



        // --- State ---
        let selectedFile = null;
        let selectedCategory = null;
        let selectedGenerateStyle = null;
        let selectedSize = null;
        let selectedModelOption = 'none';
        let base64ImageData = null;
        let uploadedLogoData = null;
        let loadingInterval = null;

        // --- Category Data ---
        const categories = [
            { id: 'elektronik', name: 'Elektronik', icon: `<i class="bi bi-tv text-2xl"></i>` },
            { id: 'komputer', name: 'Komputer & Aksesoris', icon: `<i class="bi bi-pc-display text-2xl"></i>` },
            { id: 'handphone', name: 'Handphone & Aksesoris', icon: `<i class="bi bi-phone text-2xl"></i>` },
            { id: 'pakaian_pria', name: 'Pakaian Pria', icon: `<i class="bi bi-person-standing text-2xl"></i>` },
            { id: 'sepatu_pria', name: 'Sepatu Pria', icon: `<i class="bi bi-person-walking text-2xl"></i>` },
            { id: 'tas_pria', name: 'Tas Pria', icon: `<i class="bi bi-briefcase text-2xl"></i>` },
            { id: 'aksesoris_fashion', name: 'Aksesoris Fashion', icon: `<i class="bi bi-gem text-2xl"></i>` },
            { id: 'jam_tangan', name: 'Jam Tangan', icon: `<i class="bi bi-smartwatch text-2xl"></i>` },
            { id: 'kesehatan', name: 'Produk Kesehatan', icon: `<i class="bi bi-heart-pulse text-2xl"></i>` },
            { id: 'hobi', name: 'Hobi & Koleksi', icon: `<i class="bi bi-controller text-2xl"></i>` },
            { id: 'olahraga', name: 'Olahraga & Outdoor', icon: `<i class="bi bi-bicycle text-2xl"></i>` },
            { id: 'souvenir', name: 'Souvenir & Perlengkapan', icon: `<i class="bi bi-gift text-2xl"></i>` },
            { id: 'makanan', name: 'Makanan & Minuman', icon: `<i class="bi bi-cup-straw text-2xl"></i>` },
            { id: 'kecantikan', name: 'Perawatan & Kecantikan', icon: `<i class="bi bi-brush text-2xl"></i>` },
            { id: 'rumah', name: 'Perlengkapan Rumah', icon: `<i class="bi bi-house-heart text-2xl"></i>` },
            { id: 'pakaian_wanita', name: 'Pakaian Wanita', icon: `<i class="bi bi-person-standing-dress text-2xl"></i>` },
            { id: 'fashion_muslim', name: 'Fashion Muslim', icon: `<i class="bi bi-person-raised-hand text-2xl"></i>` },
            { id: 'fashion_anak', name: 'Fashion Bayi & Anak', icon: `<i class="bi bi-emoji-smile text-2xl"></i>` },
            { id: 'ibu_bayi', name: 'Ibu & Bayi', icon: `<i class="bi bi-heart text-2xl"></i>` },
            { id: 'sepatu_wanita', name: 'Sepatu Wanita', icon: `<i class="bi bi-person-hearts text-2xl"></i>` },
            { id: 'tas_wanita', name: 'Tas Wanita', icon: `<i class="bi bi-handbag text-2xl"></i>` },
            { id: 'otomotif', name: 'Perlengkapan Otomotif', icon: `<i class="bi bi-gear-wide-connected text-2xl"></i>` },
            { id: 'buku', name: 'Buku & Alat Tulis', icon: `<i class="bi bi-book text-2xl"></i>` },
            { id: 'fotografi', name: 'Fotografi', icon: `<i class="bi bi-camera text-2xl"></i>` }
        ];

        // --- Initial Setup ---
        function initializeCategories() {
            categoryGrid.innerHTML = categories.map(cat => `
                <button class="category-btn flex-shrink-0 w-28 h-24 snap-start p-2 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:bg-gray-50" data-category="${cat.id}">
                    <div class="w-8 h-8 text-gray-600 flex items-center justify-center">${cat.icon}</div>
                    <span class="text-xs font-semibold text-center leading-tight">${cat.name}</span>
                </button>
            `).join('');

            const categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    categoryButtons.forEach(btn => btn.classList.remove('selected-style'));
                    button.classList.add('selected-style');
                    selectedCategory = button.dataset.category;
                    updateGenerateButtonState();
                });
            });
            updateScrollButtons();
        }

        const updateGenerateButtonState = () => {
            generateBtn.disabled = !(selectedFile && selectedCategory && selectedGenerateStyle && selectedSize);
        };

        // --- Modal Logic ---
        const openPreviewModal = async (originalSrc) => {
            previewImage.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
            previewModal.classList.remove('hidden');
            savePngBtn.disabled = true;

            try {
                const dimensions = getTargetDimensions();
                if (!dimensions) throw new Error("Ukuran belum dipilih.");
                let processedUrl = await resizeAndCropImage(originalSrc, dimensions.targetWidth, dimensions.targetHeight);
                if (uploadedLogoData) {
                    processedUrl = await overlayLogo(processedUrl, uploadedLogoData);
                }
                previewImage.src = processedUrl;
                savePngBtn.dataset.originalSrc = originalSrc;
            } catch (error) {
                console.error("Gagal membuat preview:", error);
                alert("Gagal membuat preview. Silakan coba lagi.");
                closePreviewModal();
            } finally {
                savePngBtn.disabled = false;
            }
        };

        const closePreviewModal = () => {
            previewImage.src = '';
            previewModal.classList.add('hidden');
        };

        document.addEventListener('DOMContentLoaded', () => {
            initializeCategories();
            updateScrollButtons();
        });

        // --- Event Listeners ---
        closePreviewBtn.addEventListener('click', closePreviewModal);
        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) closePreviewModal();
        });
        savePngBtn.addEventListener('click', (e) => {
            processAndDownloadSingleImage(e.currentTarget.dataset.originalSrc);
            closePreviewModal();
        });

        imageUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    base64ImageData = e.target.result.split(',')[1];
                    imagePreview.src = e.target.result;
                    uploadBox.parentElement.classList.add('hidden');
                    imagePreviewContainer.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
                updateGenerateButtonState();
            }
        });

        changeImageBtn.addEventListener('click', () => {
            uploadBox.parentElement.classList.remove('hidden');
            imagePreviewContainer.classList.add('hidden');
            imageUpload.value = '';
            selectedFile = null;
            base64ImageData = null;
            updateGenerateButtonState();
        });
        
        suggestCategoryBtn.addEventListener('click', async () => {
            if (!base64ImageData) return;
            
            const originalText = suggestCategoryBtn.innerHTML;
            suggestCategoryBtn.disabled = true;
            suggestCategoryBtn.innerHTML = `<div class="loader !w-5 !h-5 !border-2 inline-block mr-2"></div> Menganalisis...`;

            try {
                const categoryListForPrompt = categories.map(c => `- ${c.name} (id: ${c.id})`).join('\n');
                const prompt = `Analyze the product in this image. Based on the product, choose the single most appropriate category from the following list. Respond with ONLY the category 'id' value and nothing else.\n\nList of Categories:\n${categoryListForPrompt}`;
                
                const responseText = await callTextApiWithImage(prompt, base64ImageData, selectedFile.type);
                const suggestedId = responseText.trim();
                
                const categoryButton = document.querySelector(`.category-btn[data-category="${suggestedId}"]`);
                if (categoryButton) {
                    categoryButton.click();
                    categoryButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    console.warn("AI suggested a category ID that doesn't exist:", suggestedId);
                    alert("AI memberikan saran kategori yang tidak valid, silakan pilih manual.");
                }

            } catch (error) {
                console.error("Error suggesting category:", error);
                alert("Gagal mendapatkan saran kategori dari AI. Coba lagi nanti.");
            } finally {
                suggestCategoryBtn.disabled = false;
                suggestCategoryBtn.innerHTML = originalText;
            }
        });

        logoUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadedLogoData = e.target.result;
                    logoPreview.src = uploadedLogoData;
                    logoUploadBox.classList.add('hidden');
                    logoPreviewContainer.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });

        clearLogoBtn.addEventListener('click', () => {
            uploadedLogoData = null;
            logoPreview.src = '';
            logoPreviewContainer.classList.add('hidden');
            logoUploadBox.classList.remove('hidden');
            logoUpload.value = '';
        });

        modelOptionButtons.forEach(button => {
            button.addEventListener('click', () => {
                modelOptionButtons.forEach(btn => btn.classList.remove('selected-style'));
                button.classList.add('selected-style');
                selectedModelOption = button.dataset.model || 'none';
            });
        });

        document.querySelectorAll('.generate-style-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.generate-style-btn').forEach(btn => btn.classList.remove('selected-style'));
                button.classList.add('selected-style');
                selectedGenerateStyle = {
                    id: button.dataset.style,
                    name: button.querySelector('span').textContent
                };
                updateGenerateButtonState();
            });
        });

        document.querySelectorAll('.size-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected-style'));
                button.classList.add('selected-style');
                selectedSize = button.dataset.size;
                updateGenerateButtonState();
            });
        });

        generateBtn.addEventListener('click', () => generateImages());
        retryBtn.addEventListener('click', () => generateImages());

        // --- Category Scroll Logic ---
        const updateScrollButtons = () => {
            if (!categoryScrollContainer) return;
            const { scrollLeft, scrollWidth, clientWidth } = categoryScrollContainer;
            const isAtStart = scrollLeft <= 0;
            const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
            scrollLeftBtn.classList.toggle('hidden', isAtStart);
            scrollLeftBtn.classList.toggle('sm:flex', !isAtStart);
            scrollRightBtn.classList.toggle('hidden', isAtEnd);
            scrollRightBtn.classList.toggle('sm:flex', !isAtEnd);
        };

        scrollLeftBtn.addEventListener('click', () => categoryScrollContainer.scrollBy({ left: -300, behavior: 'smooth' }));
        scrollRightBtn.addEventListener('click', () => categoryScrollContainer.scrollBy({ left: 300, behavior: 'smooth' }));
        categoryScrollContainer.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);
        
        // --- AI Caption Generator Logic ---
        closeCaptionBtn.addEventListener('click', () => captionModal.classList.add('hidden'));
        copyCaptionBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(captionText.value).then(() => {
                copyCaptionBtn.innerHTML = '<i class="bi bi-check-lg mr-2"></i> Berhasil Disalin!';
                setTimeout(() => {
                     copyCaptionBtn.innerHTML = '<i class="bi bi-clipboard-check mr-2"></i> Salin Teks';
                }, 2000);
            });
        });
        
        // --- AI SEO Generator Logic ---
        generateSeoBtn.addEventListener('click', generateSeoContent);
        
        function setupCopyListeners() {
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const targetId = e.currentTarget.dataset.copyTarget;
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        navigator.clipboard.writeText(targetElement.value || targetElement.textContent).then(() => {
                            const originalIcon = e.currentTarget.innerHTML;
                            e.currentTarget.innerHTML = '<i class="bi bi-check-lg"></i>';
                            setTimeout(() => {
                                e.currentTarget.innerHTML = originalIcon;
                            }, 2000);
                        });
                    }
                });
            });
        }
        setupCopyListeners();


        async function generateCaption(event) {
            captionModal.classList.remove('hidden');
            captionLoading.classList.remove('hidden');
            captionResult.classList.add('hidden');

            try {
                const categoryName = categories.find(c => c.id === selectedCategory)?.name || 'produk';
                const styleName = selectedGenerateStyle.name;
                const prompt = `Anda adalah seorang copywriter marketplace profesional di Indonesia. Buatlah deskripsi produk yang menarik dan persuasif untuk produk dalam kategori '${categoryName}' dengan gaya foto '${styleName}'. Deskripsi harus singkat (2-3 kalimat), menonjolkan keunggulan utama, dan diakhiri dengan 3-5 tagar yang relevan dan populer di marketplace Indonesia. Tulis dalam Bahasa Indonesia.`;
                const resultText = await callTextApi(prompt);
                
                captionText.value = resultText;
                captionLoading.classList.add('hidden');
                captionResult.classList.remove('hidden');
            } catch (error) {
                 console.error("Error generating caption:", error);
                 captionText.value = "Maaf, AI gagal membuat caption. Silakan coba lagi.";
                 captionLoading.classList.add('hidden');
                 captionResult.classList.remove('hidden');
            }
        }
        
        async function generateSeoContent() {
            const originalButtonText = generateSeoBtn.innerHTML;
            generateSeoBtn.disabled = true;
            generateSeoBtn.innerHTML = `<div class="loader !w-5 !h-5 !border-2 inline-block mr-2"></div> Sedang menulis...`;

            try {
                const categoryName = categories.find(c => c.id === selectedCategory)?.name || 'produk umum';
                const prompt = `Based on the product image provided (category: ${categoryName}), act as an expert e-commerce copywriter. Generate marketing materials in Indonesian. Return a single, valid JSON object with three keys: "titles" (an array of 3 catchy, SEO-friendly strings under 70 characters), "description" (a single compelling string of 100-150 words), and "keywords" (an array of 10 relevant strings for a marketplace).`;
                
                const resultText = await callTextApiWithImage(prompt, base64ImageData, selectedFile.type);
                
                const match = resultText.match(/{[\s\S]*}/);
                if (!match) {
                    throw new Error("Respons AI tidak mengandung format JSON yang valid.");
                }
                const cleanJsonString = match[0];
                const seoData = JSON.parse(cleanJsonString);

                if (seoData.titles && seoData.description && seoData.keywords) {
                    seoTitlesContainer.innerHTML = seoData.titles.map((title, index) => {
                        const titleId = `seoTitle_${index}`;
                        return `
                        <div class="relative">
                            <input id="${titleId}" type="text" value="${title}" class="w-full p-2 pr-12 border border-gray-300 rounded-md bg-gray-100" readonly>
                             <button class="copy-btn absolute top-1/2 -translate-y-1/2 right-2 p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300" data-copy-target="${titleId}">
                                <i class="bi bi-clipboard"></i>
                            </button>
                        </div>`;
                    }).join('');

                    seoDisplayDescription.value = seoData.description;

                    seoKeywordsContainer.innerHTML = seoData.keywords.map(keyword => 
                        `<span class="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-1 rounded-full">${keyword}</span>`
                    ).join('');

                    seoGeneratorSection.classList.add('hidden');
                    seoDisplaySection.classList.remove('hidden');
                    setupCopyListeners(); // Re-attach listeners for new copy buttons
                } else {
                    throw new Error("Format JSON dari AI tidak lengkap.");
                }

            } catch (error) {
                 console.error("Error generating SEO content:", error);
                 alert("Gagal membuat konten SEO. Silakan coba lagi. Error: " + error.message);
            } finally {
                generateSeoBtn.disabled = false;
                generateSeoBtn.innerHTML = originalButtonText;
            }
        }


        // --- Prompt Generation ---
        function getPromptsForStyle(category, theme, style) {
            const isLight = theme === 'light';
            let prompts = [];
            let basePrompt = '';

            const fashionCategories = ['pakaian_pria', 'pakaian_wanita', 'fashion_muslim', 'fashion_anak'];
            const usingModel = fashionCategories.includes(category) && selectedModelOption !== 'none';
            const usingMannequin = fashionCategories.includes(category) && selectedModelOption === 'none';

            let figureInstruction = '';
            let figureSubject = 'The product is placed';

            if (usingModel) {
                const modelDetails = {
                    male: {
                        instruction: "Include a handsome adult male model (25-35 years old) with neat grooming and a confident, natural pose that highlights the outfit.",
                        subject: "A handsome adult male model confidently showcases the outfit"
                    },
                    female: {
                        instruction: "Include a beautiful adult female model (25-35 years old) with polished styling and an elegant pose that highlights the outfit.",
                        subject: "A beautiful adult female model gracefully showcases the outfit"
                    },
                    boy: {
                        instruction: "Include a cheerful boy model around 8-12 years old with a natural, playful pose that keeps the clothing neat and easy to evaluate.",
                        subject: "A cheerful boy model playfully showcases the outfit"
                    },
                    girl: {
                        instruction: "Include a cheerful girl model around 8-12 years old with a joyful, lively pose that keeps the clothing neat and easy to evaluate.",
                        subject: "A cheerful girl model joyfully showcases the outfit"
                    }
                };
                const chosenModel = modelDetails[selectedModelOption] || modelDetails.male;
                figureInstruction = chosenModel.instruction;
                figureSubject = chosenModel.subject;
                if (category === 'fashion_muslim') {
                    figureInstruction += " Ensure the styling follows modest fashion principles with graceful, respectful poses and appropriate coverage.";
                }
            } else if (usingMannequin) {
                const mannequinDetails = {
                    pakaian_pria: "Display the clothing on a featureless, full-body male mannequin in a dynamic, professional pose (e.g., walking, confident stance, hand in pocket). Add complementary neutral pieces when needed.",
                    pakaian_wanita: "Display the clothing on a featureless, full-body female mannequin in an elegant, professional pose (e.g., hand on hip, graceful contrapposto). Add complementary neutral pieces when needed.",
                    fashion_muslim: "Display the clothing on an appropriate featureless, full-body mannequin. Choose male or female styling based on the garment and keep the pose dignified and modest.",
                    fashion_anak: "Display the clothing on a featureless standing child mannequin. Keep proportions child-friendly and add complementary neutral pieces when needed."
                };
                figureInstruction = mannequinDetails[category] || "Display the outfit on a neutral mannequin that clearly shows fit, drape, and silhouette.";
                figureSubject = "A mannequin wearing the product and a completed outfit stands";
            }

            const figureInstructionSuffix = figureInstruction ? ` ${figureInstruction}` : '';
            const focusDescriptor = usingModel ? 'model' : usingMannequin ? 'mannequin' : 'product';

            switch (style.id) {
                case 'katalog': {
                    basePrompt = isLight
                        ? "The product ONLY on a completely plain, solid white background (#FFFFFF). No props or shadows."
                        : "The product ONLY on a plain, solid dark grey background (#1A1A1A). No props. Create a single soft shadow.";
                    basePrompt += figureInstructionSuffix;

                    const angleDescriptions = [
                        usingModel || usingMannequin
                            ? `Front-facing angle of the ${focusDescriptor}, keeping posture natural and the outfit perfectly centered.`
                            : "Front-facing angle of the product, perfectly centered.",
                        usingModel || usingMannequin
                            ? `Slightly elevated 45-degree angle that still captures the full ${focusDescriptor} and highlights depth.`
                            : "Slightly elevated 45-degree angle highlighting depth and shape.",
                        usingModel || usingMannequin
                            ? `Clean side-view angle of the ${focusDescriptor} to emphasize silhouette and structure.`
                            : "Clean side-view angle focusing on proportions.",
                        usingModel || usingMannequin
                            ? `Detailed close-up highlighting key textures or features of the outfit while keeping the ${focusDescriptor} tack sharp.`
                            : "Detailed close-up highlighting a key texture or feature of the product."
                    ];

                    prompts = angleDescriptions.map(desc => `${basePrompt} ${desc}`);
                    break;
                }

                case 'studio': {
                    basePrompt = isLight
                        ? "Professional, brightly lit studio photoshoot. Use controlled, magazine-quality lighting."
                        : "Professional, moody, dark studio photoshoot. Use controlled, dramatic lighting.";
                    basePrompt += figureInstructionSuffix;

                    const studioSubject = usingModel || usingMannequin ? figureSubject : "The product is placed";

                    if (isLight) {
                        prompts = [
                            `${basePrompt} ${studioSubject} on a minimalist white pedestal, illuminated by soft, diffused gallery lighting.`,
                            `${basePrompt} ${studioSubject} against a clean white cyclorama wall with bright, even lighting that eliminates harsh shadows.`,
                            `${basePrompt} ${studioSubject} on a polished concrete surface with large, softbox reflections visible.`,
                            `${basePrompt} High-key studio photography. ${studioSubject} against a simple, light-colored background with bright backlighting creating a gentle glow.`
                        ];
                    } else {
                        prompts = [
                            `${basePrompt} ${studioSubject} on a dark, reflective surface with dramatic side lighting (Rembrandt style) highlighting the texture.`,
                            `${basePrompt} A luxurious dark studio shot. ${studioSubject} lit by a single, focused spotlight from above to create high contrast.`,
                            `${basePrompt} ${studioSubject} on a piece of dark, wet slate, with low-key lighting that emphasizes texture.`,
                            `${basePrompt} ${studioSubject} against a textured dark background (like raw concrete or dark metal) with sharp, focused side lighting.`
                        ];
                    }
                    break;
                }

                case 'indoor': {
                    basePrompt = "IMPORTANT: First, analyze the provided product image. Then, create a professional indoor lifestyle photo. The indoor setting MUST be thematically relevant to the product (e.g., skincare on a bathroom vanity, food on a kitchen table).";
                    basePrompt += figureInstructionSuffix;

                    if (isLight) {
                        prompts = [
                            `${basePrompt} The scene is bright, clean, and airy, with soft natural light coming from a large window.`,
                            `${basePrompt} The scene is a modern, minimalist room with stylish, uncluttered decor. Lighting is bright and even.`,
                            `${basePrompt} The scene is a cozy, warm, and inviting space, like a high-end living room or boutique. Use soft, warm lighting.`,
                            `${basePrompt} The scene is professional and clean, like a modern office or studio setting suitable for the product. Use focused, gallery-style lighting.`
                        ];
                    } else {
                        prompts = [
                            `${basePrompt} The scene is a moody and atmospheric room at night, with dramatic, low-key lighting from a single warm lamp.`,
                            `${basePrompt} The scene is a luxurious, dark-themed room (e.g., dark wood, rich fabrics) with sophisticated accent lighting.`,
                            `${basePrompt} The scene is an industrial loft-style space in the evening with warm, ambient light and interesting textures like brick or concrete.`,
                            `${basePrompt} The scene is elegant and intimate, with a shallow depth of field, focusing entirely on the product with a softly blurred, dark background.`
                        ];
                    }
                    break;
                }

                case 'outdoor': {
                    basePrompt = "IMPORTANT: First, analyze the provided product image. Then, create a professional outdoor lifestyle photo. The outdoor setting MUST be thematically relevant to the product (e.g., sports shoes on a running track, swimwear at a beautiful beach).";
                    basePrompt += figureInstructionSuffix;

                    if (isLight) {
                        prompts = [
                            `${basePrompt} The scene is in a lush, natural environment like a green park or forest, with beautiful, dappled sunlight.`,
                            `${basePrompt} The scene is in a clean, modern urban setting like a stylish city street or plaza on a bright, sunny day.`,
                            `${basePrompt} The scene is at a beautiful, serene location like a beach or a manicured garden during bright daylight.`,
                            `${basePrompt} The scene has a clean, architectural background like a modern building facade or a minimalist patio, with clear, bright lighting.`
                        ];
                    } else {
                        prompts = [
                            `${basePrompt} The scene is in a vibrant city at night, with the background filled with beautiful bokeh from streetlights and neon signs.`,
                            `${basePrompt} The scene takes place during the 'golden hour,' with the warm, dramatic light of a beautiful sunset or sunrise.`,
                            `${basePrompt} The scene is in a dramatic natural landscape, like mountains or a coast, during the moody 'blue hour' just after sunset.`,
                            `${basePrompt} The scene is on a sophisticated rooftop or balcony at night, overlooking a glittering city skyline.`
                        ];
                    }
                    break;
                }

                case 'poster': {
                    basePrompt = "IMPORTANT: First, analyze the provided product image. Then, create a modern digital poster composition that highlights the product with bold typography and graphic shapes.";
                    basePrompt += figureInstructionSuffix;

                    prompts = [
                        `${basePrompt} Style: Create a bold hero shot with dynamic diagonal shapes and subtle gradients. Use complementary colors that match the product.`,
                        `${basePrompt} Style: Use pop-art inspired blocks of color and bold typography. Include energetic abstract elements that reference the product (e.g., sound waves for audio gear).`,
                        `${basePrompt} Style: Use energetic motion graphics-inspired streaks and abstract motion lines that are directly related to the product (e.g., coffee beans for coffee, fruit pieces for juice). The lighting should be bright and exciting.`,
                        `${basePrompt} Style: Create an elegant, premium, and luxurious scene. Use a minimalist background with rich textures (like dark marble, silk fabric, or clean concrete) and sophisticated lighting. Add subtle, high-class props that complement the product's purpose.`,
                    ];
                    break;
                }

                default: {
                    prompts = [ "A photo of the product.", "A different photo of the product.", "Another photo of the product.", "One more photo of the product." ];
                }
            }
            return prompts;
        }

        // --- Core Logic ---
        async function generateImages() {
            if (!selectedFile || !selectedCategory || !base64ImageData || !selectedGenerateStyle || !selectedSize) return;

            resultsContainer.classList.remove('hidden');
            imagesOutput.classList.add('hidden');
            errorContainer.classList.add('hidden');
            loadingIndicator.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.textContent = 'Memproses...';
            seoGeneratorSection.classList.add('hidden');
            seoDisplaySection.classList.add('hidden');


            const loadingMessages = ["Menganalisis produk...", "Menyiapkan studio virtual...", "Mencari angle terbaik...", "Menyesuaikan pencahayaan...", "Merender bayangan realistis...", "Memberikan sentuhan akhir..."];
            let messageIndex = 0;
            const loadingStatusText = document.getElementById('loadingStatusText');
            loadingStatusText.textContent = loadingMessages[messageIndex];
            loadingInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                loadingStatusText.textContent = loadingMessages[messageIndex];
            }, 2500);

            const selectedTheme = document.querySelector('input[name="theme-selection"]:checked').value;
            const userPrompts = getPromptsForStyle(selectedCategory, selectedTheme, selectedGenerateStyle);

            const systemPrompt = `You are a specialist AI product photographer. Your single most important job is to cleanly remove a product from its original photo and place it in a new, professional setting. Follow these rules with extreme precision:
- **RULE #1: ZERO TOLERANCE FOR HANDS.** This is your non-negotiable, highest priority. Before any other action, you must identify and COMPLETELY REMOVE any hands, fingers, or arms holding the product. Digitally reconstruct any part of the product that was covered by the hand. The final image must NEVER contain a hand holding the product. Failure to remove the hand is a complete failure of the task.
- **RULE #2: PRESERVE THE PRODUCT.** The product itself—its shape, color, labels, and text—must not be altered in any way. It must be an exact copy of the original ("dilarang merubah gambar sedikitpun").
- **RULE #3: CREATE THE NEW SCENE.** Only after the hand is removed and the product is perfectly isolated, place the unaltered product into the new scene described in the user's prompt.
- **RULE #4: ADHERE TO SCENE TYPE.** For 'Katalog' prompts, the scene must ONLY be a plain, solid color background. For all other types, create the full scene as described.
- **RULE #5: PROFESSIONALIZE.** The final output must be a hyper-realistic, magazine-quality photograph with professional lighting, shadows, and focus.`;

            try {
                const imagePromises = userPrompts.map(prompt => callImageApi(systemPrompt, prompt, base64ImageData));
                const originalResults = await Promise.all(imagePromises);
                const dimensions = getTargetDimensions();
                if (!dimensions) throw new Error("Ukuran gambar tidak valid.");
                const resizedResults = await Promise.all(originalResults.map(src => resizeAndCropImage(src, dimensions.targetWidth, dimensions.targetHeight)));
                let finalDisplayResults = resizedResults;
                if (uploadedLogoData) {
                    finalDisplayResults = await Promise.all(resizedResults.map(src => overlayLogo(src, uploadedLogoData)));
                }
                displayResults(finalDisplayResults, originalResults);
            } catch (error) {
                console.error("Error generating images:", error);
                showError(error.message);
            } finally {
                clearInterval(loadingInterval);
                loadingStatusText.textContent = 'AI sedang memulai...';
                loadingIndicator.classList.add('hidden');
                generateBtn.disabled = false;
                generateBtn.textContent = 'Mulai Edit';
            }
        }

        async function regenerateSingleImage(event) {
            const button = event.currentTarget;
            const index = parseInt(button.dataset.index, 10);
            const card = button.closest('.image-card-container');
            if (!card) return;

            const loader = card.querySelector('.card-loader');
            const imgElement = card.querySelector('img');
            const previewButton = card.querySelector('.preview-trigger-btn');

            loader.classList.remove('hidden');
            button.disabled = true;
            button.textContent = '...';

            try {
                const selectedTheme = document.querySelector('input[name="theme-selection"]:checked').value;
                let prompts = getPromptsForStyle(selectedCategory, selectedTheme, selectedGenerateStyle);
                let singlePrompt = prompts[index];
                const randomNumber = Math.floor(Math.random() * 10000);
                singlePrompt += ` CRITICAL RE-GENERATION REQUEST: Provide a completely different and new variation. Drastically change the background, composition, and lighting from any previous results. Be creative. Unique ID: ${randomNumber}.`;

                const systemPrompt = `You are a specialist AI product photographer. Your single most important job is to cleanly remove a product from its original photo and place it in a new, professional setting. Follow these rules with extreme precision:
- **RULE #1: ZERO TOLERANCE FOR HANDS.** This is your non-negotiable, highest priority. Before any other action, you must identify and COMPLETELY REMOVE any hands, fingers, or arms holding the product. Digitally reconstruct any part of the product that was covered by the hand. The final image must NEVER contain a hand holding the product. Failure to remove the hand is a complete failure of the task.
- **RULE #2: PRESERVE THE PRODUCT.** The product itself—its shape, color, labels, and text—must not be altered in any way. It must be an exact copy of the original ("dilarang merubah gambar sedikitpun").
- **RULE #3: CREATE THE NEW SCENE.** Only after the hand is removed and the product is perfectly isolated, place the unaltered product into the new scene described in the user's prompt.
- **RULE #4: ADHERE TO SCENE TYPE.** For 'Katalog' prompts, the scene must ONLY be a plain, solid color background. For all other types, create the full scene as described.
- **RULE #5: PROFESSIONALIZE.** The final output must be a hyper-realistic, magazine-quality photograph with professional lighting, shadows, and focus.`;
                const newOriginalImageUrl = await callImageApi(systemPrompt, singlePrompt, base64ImageData);
                const dimensions = getTargetDimensions();
                if (!dimensions) throw new Error("Ukuran gambar tidak valid.");
                const resizedImageUrl = await resizeAndCropImage(newOriginalImageUrl, dimensions.targetWidth, dimensions.targetHeight);
                let newDisplayUrl = resizedImageUrl;
                if (uploadedLogoData) {
                    newDisplayUrl = await overlayLogo(resizedImageUrl, uploadedLogoData);
                }
                imgElement.src = newDisplayUrl;
                previewButton.dataset.originalSrc = newOriginalImageUrl;
            } catch (error) {
                console.error(`Error regenerating image at index ${index}:`, error);
            } finally {
                loader.classList.add('hidden');
                button.disabled = false;
                button.innerHTML = `<i class="bi bi-arrow-repeat mr-1.5 text-base"></i> Ulangi`;
            }
        }
        
        // --- Gemini API Call Functions ---
        async function callApiWithExponentialBackoff(apiUrl, payload) {
            let attempts = 0;
            const maxAttempts = 3;
            let delay = 1000;
            while (attempts < maxAttempts) {
                try {
                    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (response.ok) return await response.json();
                    throw new Error(`API request failed with status ${response.status}`);
                } catch (error) {
                    attempts++;
                    if (attempts >= maxAttempts) throw error;
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                }
            }
        }

        async function callTextApi(userPrompt) {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ parts: [{ text: userPrompt }] }] };
            const result = await callApiWithExponentialBackoff(apiUrl, payload);
            return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
        
        async function callTextApiWithImage(userPrompt, imageData, imageType) {
             const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ parts: [{ text: userPrompt }, { inlineData: { mimeType: imageType, data: imageData } }] }] };
            const result = await callApiWithExponentialBackoff(apiUrl, payload);
            return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }

        async function callImageApi(systemPrompt, userPrompt, imageData) {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
            const payload = {
                contents: [{ parts: [{ text: systemPrompt }, { text: userPrompt }, { inlineData: { mimeType: selectedFile.type, data: imageData } }] }],
                generationConfig: { responseModalities: ['IMAGE'] },
            };
            const result = await callApiWithExponentialBackoff(apiUrl, payload);
            const candidate = result?.candidates?.[0];
            if (!candidate || !candidate.content || !candidate.content.parts || !candidate.content.parts.find(p => p.inlineData)) {
                let errorMessage = 'Gagal memproses gambar. AI tidak mengembalikan data gambar.';
                if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
                    errorMessage = `Generasi gambar dihentikan oleh AI. Alasan: ${candidate.finishReason}. Ini mungkin karena filter keamanan. Coba gambar atau gaya lain.`;
                }
                throw new Error(errorMessage);
            }
            const base64Data = candidate.content.parts.find(p => p.inlineData).inlineData.data;
            return `data:image/png;base64,${base64Data}`;
        }

        function displayResults(imagesToDisplay, originalRawImages) {
            try {
                resultsGrid.innerHTML = '';
                resultsTitle.textContent = `Hasil Generate: ${selectedGenerateStyle.name}`;
                let aspectRatioClass = selectedSize === 'story' ? 'aspect-[9/16]' : selectedSize === 'post' ? 'aspect-[4/5]' : 'aspect-square';

                imagesToDisplay.forEach((displayUrl, index) => {
                    const rawUrl = originalRawImages[index];
                    const imageCard = `
                        <div class="image-card-container bg-white rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col overflow-hidden group">
                            <div class="relative image-wrapper ${aspectRatioClass} w-full bg-gray-100">
                                <img src="${displayUrl}" class="w-full h-full object-cover" alt="Generated Product Image ${index + 1}">
                                <div class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center hidden card-loader"><div class="loader !w-10 !h-10"></div></div>
                            </div>
                            <div class="grid grid-cols-3 mt-auto">
                                <button data-original-src="${rawUrl}" class="preview-trigger-btn w-full flex items-center justify-center text-center bg-gray-100 text-gray-800 font-semibold py-2 px-3 hover:bg-gray-200 transition-colors text-sm border-t border-r border-gray-200">
                                    <i class="bi bi-eye mr-1.5 text-base"></i> Preview
                                </button>
                                <button data-index="${index}" class="regenerate-trigger w-full flex items-center justify-center text-center bg-gray-100 text-green-600 font-semibold py-2 px-3 hover:bg-gray-200 transition-colors text-sm border-t border-r border-gray-200">
                                    <i class="bi bi-arrow-repeat mr-1.5 text-base"></i> Ulangi
                                </button>
                                <button data-index="${index}" class="caption-trigger-btn w-full flex items-center justify-center text-center bg-purple-100 text-purple-700 font-semibold py-2 px-3 hover:bg-purple-200 transition-colors text-sm border-t border-gray-200">
                                    <i class="bi bi-magic mr-1.5 text-base"></i> Caption
                                </button>
                            </div>
                        </div>
                    `;
                    resultsGrid.innerHTML += imageCard;
                });

                resultsGrid.querySelectorAll('.preview-trigger-btn').forEach(trigger => trigger.addEventListener('click', (e) => openPreviewModal(e.currentTarget.dataset.originalSrc)));
                resultsGrid.querySelectorAll('.regenerate-trigger').forEach(trigger => trigger.addEventListener('click', regenerateSingleImage));
                resultsGrid.querySelectorAll('.caption-trigger-btn').forEach(trigger => trigger.addEventListener('click', generateCaption));

                imagesOutput.classList.remove('hidden');
                errorContainer.classList.add('hidden');
                seoDisplaySection.classList.add('hidden'); 
                seoGeneratorSection.classList.remove('hidden');

            } catch (error) {
                console.error("Error displaying results:", error);
                showError("Terjadi kesalahan saat menampilkan gambar hasil generate.");
            }
        }

        function showError(message) {
            const errorMessageText = document.getElementById('errorMessageText');
            errorMessageText.textContent = message || "Maaf sepertinya server lagi penuh nih, yuk ulangi lagi.";
            imagesOutput.classList.add('hidden');
            loadingIndicator.classList.add('hidden');
            errorContainer.classList.remove('hidden');
        }

        function getTargetDimensions() {
            if (!selectedSize) return null;
            switch (selectedSize) {
                case 'post': return { targetWidth: 1080, targetHeight: 1350, selectedSizeValue: 'post' };
                case 'story': return { targetWidth: 1080, targetHeight: 1920, selectedSizeValue: 'story' };
                case 'market': return { targetWidth: 2000, targetHeight: 2000, selectedSizeValue: 'market' };
                default: return null;
            }
        }

        async function universalDownload(uri, filename) {
            try {
                const response = await fetch(uri);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(url), 100);
            } catch (error) {
                console.error("Download failed, falling back to window.open:", error);
                const newWindow = window.open(uri, '_blank');
                if (!newWindow) {
                    alert("Gagal membuka gambar. Mohon izinkan pop-up untuk situs ini.");
                }
            }
        }

        function resizeAndCropImage(imgSrc, targetWidth, targetHeight) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    const ctx = canvas.getContext('2d');
                    const sourceAspectRatio = img.width / img.height;
                    const targetAspectRatio = targetWidth / targetHeight;
                    let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
                    if (sourceAspectRatio > targetAspectRatio) {
                        sWidth = img.height * targetAspectRatio;
                        sx = (img.width - sWidth) / 2;
                    } else if (sourceAspectRatio < targetAspectRatio) {
                        sHeight = img.width / targetAspectRatio;
                        sy = (img.height - sHeight) / 2;
                    }
                    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => reject(new Error('Image could not be loaded for resizing.'));
                img.src = imgSrc;
            });
        }

        async function overlayLogo(baseImageSrc, logoImageSrc) {
            return new Promise((resolve, reject) => {
                const baseImg = new Image();
                const logoImg = new Image();
                baseImg.crossOrigin = "anonymous";
                logoImg.crossOrigin = "anonymous";
                let loaded = 0;
                const onBothLoaded = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = baseImg.width; canvas.height = baseImg.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(baseImg, 0, 0);
                    ctx.globalAlpha = 0.80;
                    const logoWidth = canvas.width * 0.20;
                    const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
                    const margin = canvas.width * 0.04;
                    const position = document.getElementById('logoPosition').value;
                    let x, y;
                    switch (position) {
                        case 'top-left': x = margin; y = margin; break;
                        case 'top-center': x = (canvas.width - logoWidth) / 2; y = margin; break;
                        case 'bottom-right': x = canvas.width - logoWidth - margin; y = canvas.height - logoHeight - margin; break;
                        case 'bottom-left': x = margin; y = canvas.height - logoHeight - margin; break;
                        default: x = canvas.width - logoWidth - margin; y = margin; break;
                    }
                    ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
                    resolve(canvas.toDataURL('image/png'));
                };
                baseImg.onload = () => { if (++loaded === 2) onBothLoaded(); };
                logoImg.onload = () => { if (++loaded === 2) onBothLoaded(); };
                baseImg.onerror = () => reject(new Error('Base image failed to load for logo overlay.'));
                logoImg.onerror = () => reject(new Error('Logo image failed to load for overlay.'));
                baseImg.src = baseImageSrc;
                logoImg.src = logoImageSrc;
            });
        }

        async function processAndDownloadSingleImage(originalImageSrc) {
            if (!originalImageSrc) return;
            const dimensions = getTargetDimensions();
            if (!dimensions) {
                alert("Pilih ukuran terlebih dahulu di Langkah 7.");
                return;
            };
            try {
                let dataUrl = await resizeAndCropImage(originalImageSrc, dimensions.targetWidth, dimensions.targetHeight);
                if (uploadedLogoData) {
                    dataUrl = await overlayLogo(dataUrl, uploadedLogoData);
                }
                const filename = `ai-product-optimizer_image_${dimensions.selectedSizeValue}.png`;
                await universalDownload(dataUrl, filename);
            } catch (error) {
                console.error("Error processing single image:", error);
            }
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
            }
        });
