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
            let step_content = elem.find('.wz-step').toArray();
            let step = 0;

            function loader(action){
                let loader ='<div class="loading"></div>';
                if(action === true){ //Show Loader Spinner
                    content.fadeOut(500,function(){
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
                        content.fadeIn(500);
                    }, 500);
                }
            }

            function react(action){

                if(step >= 0 && step < step_count){
                    if(action === 'next'){
                        step++;
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

            $(elem).on('click','.wz-navigator .btn',function(){
                let action = $(this).data('action');
                react(action);
            });

            $(elem).on('click','nav a',function() {
                step = $(this).index();
                render();
            });

            render();
        });
    }

}(jQuery));