var helpers = {
    addDebugNode: function (scope) {
        scope._debugNode = new cc.PhysicsDebugNode(scope.space);
        scope._debugNode.setVisible(true);
        scope.addChild(scope._debugNode, 1000);
    }
};
