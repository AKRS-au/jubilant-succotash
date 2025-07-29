(function(){
var fns = {};
window.svyClientSideFunctions = fns;
fns['1D15BF13-8C65-475C-80C2-B877FAD3EAB0']=(function renderEntryToDo(entry) {	var type = entry.dp0,		vDescription = entry.dp1 || '',		vDetails = entry.dp2 || '',		vDetails2 = entry.dp3 || '',		vDetails3 = entry.dp4 || '',		entityID = entry.dp5,		vTypeDescriptionLabels = entry.dp6,		vNote = entry.dp8 || '',		vCommThread = entry.dp9 || '',		vNoOfAssignedUsers = entry.dp10,		vUserInitials = entry.dp11 || '',		vAvatarImage = entry.dp12 || '',		vUserColorID = entry.dp13,		vPreparedTask = entry.dp14 || '';		var addPlus = '';		if(vNoOfAssignedUsers > 1){		addPlus = '+'	}			/** Default Colours - Grey Background & Blue Color */	var avatarBGString = 'avatarBGOne';		/**  Colours For single assigned user - Uses ipsUser AvatarColorID */	if(vUserInitials && vNoOfAssignedUsers == 1){				if(vUserColorID == 0){			avatarBGString = 'avatarBGTwo';		}else if(vUserColorID == 1){			avatarBGString = 'avatarBGThree';		}else if(vUserColorID == 2){			avatarBGString = 'avatarBGFour';		}else if(vUserColorID == 3){			avatarBGString = 'avatarBGFive'		}			}	var template = '';	var typeClass = '';	var borderClass = '';	var rightBoderClass = '';	switch (type) {	case vTypeDescriptionLabels['STATUTORY']:		typeClass = 'todo-statutory-type';		borderClass = 'todo-statutory-border';		break;	case vTypeDescriptionLabels['ADMINISTRATIVE']:		typeClass = 'todo-administrative-type';		borderClass = 'todo-administrative-border';		break;	case vTypeDescriptionLabels['INTERNAL']:		typeClass = 'todo-internal-type';		borderClass = 'todo-internal-border';		break;	case vTypeDescriptionLabels['DOCUMENT']:		typeClass = 'todo-document-type';		borderClass = 'todo-document-border';		break;	case vTypeDescriptionLabels['CHECKLIST']:		typeClass = 'todo-checklist-type';		borderClass = 'todo-checklist-border';		break;	default:		break;	}	if (vDetails3 != '') {		rightBoderClass = 'todo-overdue-border';	}	template += '<div class="flex dashboard-todo fs-16 ' + borderClass + ' ' + rightBoderClass + ' pointer padding-10" data-justify-content="flex-start" data-align-items="stretch" data-target="' + type + '-' + entityID + '">';	template += '    <div class="flex-item dash-flex-top-align" data-shrink="1"><span class="dashboard-type fs-16 ' + typeClass + '">' + type + '</span><span class="dash-task-check" data-target="check' + '-' + entityID +'"><span class="tooltiptext">Status</span></div>';	template += '    </span>\					 <div class="flex-item dash-casename-flex">' + vDescription + '<br />';	template += '		 <div class="dash-details-flex">\								  <div style="">' + vDetails2 + '</div>\								  ' + vNote + '\								  ' + vCommThread + '\								  '+ vPreparedTask + '\						 </div>\					 </div>';	template += '    <div class="flex-item">' + vDetails3 + '</div>';		if(vAvatarImage && vNoOfAssignedUsers == 1){		template += '	 <div class="flex-item dash-avatar-outer-div" data-target="avatar' + '-' + entityID +'"><img class="img-center dash-avatar-style" src="data:image/png;base64, ' + vAvatarImage + '" /><span class="tooltiptext">Assign Staff</span></div>';	}else if(vUserInitials && vNoOfAssignedUsers == 1){		template += '	 <div class="flex-item dash-avatar-outer-div" data-target="avatar' + '-' + entityID +'"><span class="dash-avatar-style dash-initials ' + avatarBGString + '">' + vUserInitials + '</span><span class="tooltiptext">Assign Staff</span></div>';	}else if(!vNoOfAssignedUsers){		template += '	 <div class="flex-item dash-avatar-outer-div" data-target="avatar' + '-' + entityID +'"><span class="dash-avatar-style fa-regular fa-user ' + avatarBGString + '"></span><span class="tooltiptext">Assign Staff</span></div>';	}else{		template += '	 <div class="flex-item dash-avatar-outer-div" data-target="avatar' + '-' + entityID +'"><span class="dash-avatar-style dash-initials ' + avatarBGString + '">' + addPlus + vNoOfAssignedUsers + '</span><span class="tooltiptext">Assign Staff</span></div>';	}		template += '</div>';		return template;});
fns['DABB2AC0-06E6-4AE8-B598-43EFEBF27130']=(function renderFilterEntry(entry) {  
			var template = '';
			var strDivider = ' : ';
			var entryValue = entry.value ? entry.value.toString() : ''; 
			var valuesArr = entryValue.split(',');
			for ( var i = 0; i < valuesArr.length ; i++ ) {
				if (valuesArr[i].indexOf('!=') === 0) { 
					valuesArr[i] = '-' + valuesArr[i].substring(2, valuesArr[i].length); 
				} else if (valuesArr[i].indexOf('!') === 0) { 
					valuesArr[i] = '-' + valuesArr[i].substring(1, valuesArr[i].length); 
				} else if (valuesArr[i].indexOf('%!=') === 0) { 
					valuesArr[i] = '-' + valuesArr[i].substring(3, valuesArr[i].length); 
				} 
			}
			template += '<div class="btn-group push-right margin-left-10 toolbar-filter-tag">' + 
			'<button class="btn btn-default btn-sm btn-round" data-target="open" svy-tooltip="entry.text + entry.operator + \' \' + entry.value">' + 
				'<span class="toolbar-filter-tag-text">' + entry.text + '</span>' + 
				'<span class="toolbar-filter-tag-operator">' + entry.operator + '</span>' + 
				'<span class="toolbar-filter-tag-value"> ' + valuesArr.join(', ') + ' </span>' + 
				'<span class="toolbar-filter-tag-icon fas fa-solid fa-angle-down">' + '</span>' + 
			'</button>' + 
			'<button class="btn btn-default btn-sm btn-round" data-target="close">' + 
			'<span class="fa fa-times fa-solid fa-xmark text-danger">' + '</span>' + '</button>' + '</div>'; 
			return template; 
		});
})();
