var vcard= {
    str_start:'BEGIN:VCARD\nVERSION:3.0\n',
    str_vcard:'BEGIN:VCARD\nVERSION:3.0\n',
    str_end:'\nEND:VCARD',
    goog_chart:'http://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=',
    form:[],
    get_field: function(field){
        for(var i in vcard.form){
            if(vcard.form[i].name === field){ 
                return vcard.form[i].value.replace(/^\s+|\s+$/g,"");
            } 
        }
    },
    add_you: function(){
        var first_name = vcard.get_field("first_name"),
        middle_name = vcard.get_field("middle_name"),
            last_name = vcard.get_field("last_name");
        
        vcard.str_vcard += 'N:'+last_name+';'+first_name+';'+middle_name+'\n'+
                            'FN:'+first_name+' '+middle_name+' '+last_name;
    },
    add_tel: function(){
     var work = vcard.get_field("org_tel");        
        if(work !== ''){ vcard.str_vcard += '\nTEL;TYPE=work:'+work; }
    },
    add_email: function(){
       var work = vcard.get_field("org_email");        
        if(work !== ''){ vcard.str_vcard += '\nEMAIL;TYPE=work:'+work; }
    },
    add_url: function(){
       var work = vcard.get_field("org_url");        
        if(work !== ''){ vcard.str_vcard += '\nURL;TYPE=work:'+work; }
    },
    add_work: function(){
       var title = vcard.get_field("org_title");        
        if(title !== ''){ vcard.str_vcard +='\nTITLE:'+title; }
    },

    required_check: function(){
        var first_name = vcard.get_field("first_name"),
            last_name = vcard.get_field("last_name"),
            msg = 'Field%FIELD% %NAME% %VERB% required.',
            fields = [];
        
        if(first_name === ''){ fields.push('First name'); }
        
        if(last_name === ''){ fields.push('Last name'); }
        
        if(fields.length === 0){ return ''; }
        
        msg = msg.replace('%NAME%',fields.join(', '));
        
        msg = msg.replace('%FIELD%',(fields.length === 1) ? '' : 's');
        
        msg = msg.replace('%VERB%',(fields.length === 1) ? 'is' : 'are'); 
            
        return msg;
    },
    save: function(){
        vcard.form = $('form').serializeArray();
        
        var required_check_output = vcard.required_check();
        
        if(required_check_output !== ''){
            alert(required_check_output);
            return;
        }
        
        vcard.add_you();
        
        vcard.add_tel();
        
        vcard.add_email();
        
        vcard.add_url();
        
        vcard.add_work();
        
        vcard.str_vcard += vcard.str_end;
        
        $('textarea[name="vcard"]').val(vcard.str_vcard);
     
        $('#qr').attr('src',vcard.goog_chart+vcard.str_vcard.replace(/\n/g,'%0A'));
        
        vcard.str_vcard = vcard.str_start;
    }
};

$(function(){
    $('input[name="submit"]').click(vcard.save);
});