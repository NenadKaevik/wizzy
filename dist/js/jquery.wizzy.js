(function($){

    $.fn.wizzy = function(options) {
        
        let settings = $.extend({
            stepNumbers: false,
        }, options);

        return this.each(function(){
            let elem = $(this);
            let navigator = elem.find('.wz-navigator');
            let content = elem.find('.wz-inner');

            let btnNext = '<a href="#" class="btn btn-primary right" data-action="next">Next <i class="fas fa-angle-right"></i></a>';
            let btnBack = '<a href="#" class="btn btn-default left" data-action="back"><i class="fas fa-angle-left"></i> Back</a>';
            let btnFinish = '<a href="#" class="btn btn-success right" data-action="finish">Finish <i class="fas fa-check"></i></a>';

            let step_links = elem.find('nav a').toArray();
            let step_count = step_links.length;
            let step_status = new Array(step_count);
            let step_content = elem.find('.wz-step').toArray();
            let step = 0;

            function init(){
                for(i = 1 ; i < step_count ; i++){
                    step_status[i] = 0;
                }
                step_status[0] = 1;
                render();
            }

            /**
             * 
             * @param {boolean} show 
             */
            function loader(show){
                let loader ='<div class="loading"></div>';
                if(show === true){ //Show Loader Spinner
                    content.fadeOut(400,function(){
                        elem.addClass('progress');
                        setTimeout(() => {
                            elem.append(loader);
                        }, 500);
                    });
                }
                else{
                    elem.find('.loading').remove();
                    elem.removeClass('progress');
                    setTimeout(() => {
                        content.fadeIn(400);
                    }, 400);
                }
            }

            /**
             * 
             * @param {string} action 
             */
            function react(action){

                if(step >= 0 && step < step_count){
                    if(action === 'next'){
                        step_status[step++] = 2;
                        if(step_status[step] === 0){
                            step_status[step] = 1;
                        }
                        render(step);
                    }
                    else if(action == 'back'){
                        step--;
                        render(step);
                    }
                    else if(action == 'finish'){
                        loader(true);
                        setTimeout(() => {
                            loader(false);
                        }, 3000);
                    }
                }
                
            }

            /**
             * Render out the content
             */
            function render(){
                navigator.html('');

                if(step === 0){
                    navigator.append(btnNext);
                }
                else if(step === step_count-1){
                    navigator.append(btnBack + btnFinish);
                }
                else{
                    navigator.append(btnBack + btnNext);
                }
                

                elem.find('nav a').removeClass('active completed');
                for(i = 0 ; i < step ; i++){
                    $(step_links[i]).addClass('completed');
                }
                $(step_links[i]).addClass('active');

                elem.find('.wz-body .wz-step').removeClass('active');
                $(step_content[step]).addClass('active');
            }

            /**
             * Click events
             */
            $(elem).on('click','.wz-navigator .btn',function(){
                let action = $(this).data('action');
                react(action);
            });

            $(elem).on('click','nav a',function() {
                let step_check = $(this).index();
                if(step_status[step_check] === 1 || step_status[step_check] === 2){
                    step = $(this).index();
                    render();
                }
                else{
                    console.log('Check errors');
                }
            });

            
            init();
        });
    }

}(jQuery));